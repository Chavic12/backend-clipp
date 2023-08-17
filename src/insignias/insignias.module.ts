import { Module } from '@nestjs/common';
import { InsigniasService } from './insignias.service';
import { InsigniasController } from './insignias.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insignia } from './entities/insignia.entity';
import { Actividade } from 'src/actividades/entities/actividade.entity';

@Module({
  controllers: [InsigniasController],
  providers: [InsigniasService],
  imports: [
    TypeOrmModule.forFeature([ Insignia, Actividade ]),
    CloudinaryModule
  ]
})
export class InsigniasModule {}
