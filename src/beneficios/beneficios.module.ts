import { Module } from '@nestjs/common';
import { BeneficiosService } from './beneficios.service';
import { BeneficiosController } from './beneficios.controller';
import { Beneficio } from './entities/beneficio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [BeneficiosController],
  providers: [BeneficiosService],
  imports: [
    TypeOrmModule.forFeature([ Beneficio ]),
    CloudinaryModule
  ]
})
export class BeneficiosModule {}
