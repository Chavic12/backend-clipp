import { Module } from '@nestjs/common';
import { PublicidadService } from './publicidad.service';
import { PublicidadController } from './publicidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicidad } from './entities/publicidad.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [PublicidadController],
  providers: [PublicidadService],
  imports: [
    TypeOrmModule.forFeature([ Publicidad ]),
    CloudinaryModule
  ]
})
export class PublicidadModule {}
