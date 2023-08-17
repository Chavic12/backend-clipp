import { Module } from '@nestjs/common';
import { RegistroActividadService } from './registro-actividad.service';
import { RegistroActividadController } from './registro-actividad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroActividad } from './entities/registro-actividad.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Actividade } from 'src/actividades/entities/actividade.entity';

@Module({
  controllers: [RegistroActividadController],
  providers: [RegistroActividadService],
  imports: [
    TypeOrmModule.forFeature([ RegistroActividad, Usuario, Actividade])
  ]
})
export class RegistroActividadModule {} 
