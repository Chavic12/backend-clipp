import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateInsigniaBeneficioDto } from './dto/create-insignia-beneficio.dto';
import { UpdateInsigniaBeneficioDto } from './dto/update-insignia-beneficio.dto';
import { InsigniaBeneficio } from './entities/insignia-beneficio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insignia } from 'src/insignias/entities/insignia.entity';
import { Beneficio } from 'src/beneficios/entities/beneficio.entity';

@Injectable()
export class InsigniaBeneficioService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(InsigniaBeneficio)
    private readonly registroInsigniaRepository: Repository<InsigniaBeneficio>,
    @InjectRepository(Insignia)
    private readonly insigniaRepository: Repository<Insignia>,
    @InjectRepository(Beneficio)
    private readonly beneficioRepository: Repository<Beneficio>,
    
  ) {}
  async createRegistro(createInsigniaBeneficioDto: CreateInsigniaBeneficioDto): Promise<InsigniaBeneficio> {
    const insigniaId = createInsigniaBeneficioDto.insigniaId;
    const beneficioId = createInsigniaBeneficioDto.beneficioId;
    console.log(insigniaId)
    const insignia = await this.insigniaRepository.findOneBy({id: insigniaId});
    const beneficio = await this.beneficioRepository.findOneBy({id: beneficioId});
    console.log(insignia)

    if (!insignia) {
      throw new NotFoundException(`Usuario con ID ${insigniaId} no encontrado`);
    }
  
    if (!beneficio) {
      throw new NotFoundException(`Insignia con ID ${beneficioId} no encontrada`);
    }
  


    try {
      const registro = this.registroInsigniaRepository.create({
        insignia, 
        beneficio, 
      });
  
      await this.registroInsigniaRepository.save(registro);
      return registro;
    } catch (error) {
      this.handleDBExceptions(error);
    }
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
