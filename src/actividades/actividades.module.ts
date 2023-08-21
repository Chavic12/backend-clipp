import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividade } from './entities/actividade.entity';
import { RegistroActividad } from 'src/registro-actividad/entities/registro-actividad.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService],
  imports: [
    TypeOrmModule.forFeature([ Actividade, RegistroActividad, Usuario  ])
  ]
})
export class ActividadesModule {}
