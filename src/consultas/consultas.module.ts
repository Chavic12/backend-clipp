import { Module } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RegistroInsignia } from 'src/registro-insignia/entities/registro-insignia.entity';
import { Insignia } from 'src/insignias/entities/insignia.entity';

@Module({
  controllers: [ConsultasController],
  providers: [ConsultasService],
  imports: [TypeOrmModule.forFeature([Usuario, RegistroInsignia, Insignia])],
})
export class ConsultasModule {}
