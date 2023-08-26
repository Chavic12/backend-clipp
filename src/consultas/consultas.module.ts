import { Module } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RegistroInsignia } from 'src/registro-insignia/entities/registro-insignia.entity';

@Module({
  controllers: [ConsultasController],
  providers: [ConsultasService],
  imports: [TypeOrmModule.forFeature([Usuario, RegistroInsignia])],
})
export class ConsultasModule {}
