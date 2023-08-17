import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { Actividade } from './entities/actividade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ActividadesService {
  private readonly logger = new Logger('ProductsService');


  constructor(
    @InjectRepository(Actividade)
    private readonly actividadRepository: Repository<Actividade>,
  ) { }
  
    
  async create(createActividadeDto: CreateActividadeDto) {
    try {
      const actividad = this.actividadRepository.create(createActividadeDto);
      await this.actividadRepository.save(actividad);
      return actividad;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const actividades = await this.actividadRepository.find({
      take: limit,
      skip: offset,
      // TODO: RELACIONES 
    })
    return actividades;
  }

  async findOne(id: number) {
    const actividad = await this.actividadRepository.findOneBy({ id })
    if( !actividad ) throw new NotFoundException(`Actividad #${id} not found`);
    return actividad;
  }

  async update(id: number, updateActividadeDto: UpdateActividadeDto) {
    const actividad = await this.actividadRepository.preload({
      id: id,
      ...updateActividadeDto
    })

    if( !actividad ) throw new NotFoundException(`Usuario #${id} not found`);
    return this.actividadRepository.save(actividad);
  }

  async remove(id: number) {
    const actividad = await this.findOne(id);
    await this.actividadRepository.remove(actividad);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs!!',
    );
  }

}
