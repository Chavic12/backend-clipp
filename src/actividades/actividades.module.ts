import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividade } from './entities/actividade.entity';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService],
  imports: [
    TypeOrmModule.forFeature([ Actividade ])
  ]
})
export class ActividadesModule {}
