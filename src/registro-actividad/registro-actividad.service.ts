import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRegistroActividadDto } from './dto/create-registro-actividad.dto';
import { UpdateRegistroActividadDto } from './dto/update-registro-actividad.dto';
import { RegistroActividad } from './entities/registro-actividad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Actividade } from 'src/actividades/entities/actividade.entity';

@Injectable()
export class RegistroActividadService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(RegistroActividad)
    private readonly registroActividadRepository: Repository<RegistroActividad>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Actividade)
    private readonly actividadRepository: Repository<Actividade>,
    
  ) {}

  async createRegistro(createRegistro: CreateRegistroActividadDto): Promise<RegistroActividad> {
    // Verificar si el usuario y la actividad existen
    const idUsuario = createRegistro.usuarioId;
    const idActividad = createRegistro.actividadId;
    console.log(idUsuario)
    const usuario = await this.usuarioRepository.findOneBy({id: idUsuario});
    const actividad = await this.actividadRepository.findOneBy({id: idActividad});
    console.log(usuario)

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
    }
  
    if (!actividad) {
      throw new NotFoundException(`Actividad con ID ${idActividad} no encontrada`);
    }
  

    // Agregar el valor 'pendiente' al estado en el DTO
    createRegistro.estado = 'pendiente';

    try {
      const registro = this.registroActividadRepository.create({
        usuario, // Asigna la instancia de Usuario
        actividad, // Asigna la instancia de Actividad
        estado: 'pendiente', // Asigna el estado por defecto
        fechaCompletado: null, // Asigna la fecha nula por defecto
      });
  
      await this.registroActividadRepository.save(registro);
      return registro;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async updateEstadoCompletado(registroId: number, updateRegistroActividadDto: UpdateRegistroActividadDto): Promise<RegistroActividad> {
    const registro = await this.registroActividadRepository.preload({
      id: registroId,
      ...updateRegistroActividadDto
    })
    // Verifica si el registro está en estado "pendiente" antes de actualizar
    if (registro.estado === 'pendiente') {
      registro.estado = 'completado';
      registro.fechaCompletado = new Date(); // Establece la fecha actual

      await this.registroActividadRepository.save(registro);
    }

    return registro;
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
