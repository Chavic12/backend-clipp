import { Module } from '@nestjs/common';
import { InsigniaBeneficioService } from './insignia-beneficio.service';
import { InsigniaBeneficioController } from './insignia-beneficio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsigniaBeneficio } from './entities/insignia-beneficio.entity';
import { Insignia } from 'src/insignias/entities/insignia.entity';
import { Beneficio } from 'src/beneficios/entities/beneficio.entity';

@Module({
  controllers: [InsigniaBeneficioController],
  providers: [InsigniaBeneficioService],
  imports: [
    TypeOrmModule.forFeature([ InsigniaBeneficio, Insignia, Beneficio ])
  ]

})
export class InsigniaBeneficioModule {}
