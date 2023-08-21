import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { Actividade } from './entities/actividade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { RegistroActividad } from 'src/registro-actividad/entities/registro-actividad.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class ActividadesService {
  private readonly logger = new Logger('ProductsService');


  constructor(
    @InjectRepository(Actividade)
    private readonly actividadRepository: Repository<Actividade>,
    @InjectRepository(RegistroActividad)
    private readonly registroActividadRepository: Repository<RegistroActividad>,
    @InjectRepository(Usuario) // Inyecta el repositorio de usuarios
    private readonly usuarioRepository: Repository<Usuario>, // Agrega esta línea
  ) { }
  
  async create(createActividadeDto: CreateActividadeDto) {
    try {
      const actividad = this.actividadRepository.create({
        progreso: 0,
        ...createActividadeDto,
      });
      await this.actividadRepository.save(actividad);

      // Obtener la lista de usuarios
      const usuarios = await this.usuarioRepository.find();

      // Crear registros en RegistroActividad para cada usuario y actividad
      for (const usuario of usuarios) {
        const registro = this.registroActividadRepository.create({
          usuario,
          actividad,
          estado: false,
          progreso: 0,
        });
        await this.registroActividadRepository.save(registro);
      }

      return actividad;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
    
  // async create(createActividadeDto: CreateActividadeDto) {
  //   try {
  //     const actividad = this.actividadRepository.create(createActividadeDto);
  //     await this.actividadRepository.save(actividad);
  //     return actividad;
  //   } catch (error) {
  //     this.handleDBExceptions(error);
  //   }
  // }

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
