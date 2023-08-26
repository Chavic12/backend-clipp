import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Actividade } from 'src/actividades/entities/actividade.entity';
import { RegistroActividad } from 'src/registro-actividad/entities/registro-actividad.entity';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [
    TypeOrmModule.forFeature([ Usuario, Actividade, RegistroActividad ])
  ]

})
export class UsuariosModule {}
