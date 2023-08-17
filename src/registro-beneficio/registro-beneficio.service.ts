import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRegistroBeneficioDto } from './dto/create-registro-beneficio.dto';
import { UpdateRegistroBeneficioDto } from './dto/update-registro-beneficio.dto';
import { RegistroBeneficio } from './entities/registro-beneficio.entity';
import { Repository } from 'typeorm';
import { Beneficio } from 'src/beneficios/entities/beneficio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class RegistroBeneficioService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(RegistroBeneficio)
    private readonly registroInsigniaRepository: Repository<RegistroBeneficio>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Beneficio)
    private readonly beneficioRepository: Repository<Beneficio>,
    
  ) {}


  async createRegistro(createRegistroBeneficioDto: CreateRegistroBeneficioDto): Promise<RegistroBeneficio> {
    const idUsuario = createRegistroBeneficioDto.usuarioId;
    const idBeneficio = createRegistroBeneficioDto.beneficioId;
    console.log(idUsuario)
    const usuario = await this.usuarioRepository.findOneBy({id: idUsuario});
    const beneficio = await this.beneficioRepository.findOneBy({id: idBeneficio});
    console.log(usuario)

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
    }
  
    if (!beneficio) {
      throw new NotFoundException(`Insignia con ID ${idBeneficio} no encontrada`);
    }
  

    createRegistroBeneficioDto.fechaCompletado = new Date();

    try {
      const registro = this.registroInsigniaRepository.create({
        usuario, 
        beneficio, 
        fechaCompletado: new Date(),
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
