import { Module } from '@nestjs/common';
import { RegistroBeneficioService } from './registro-beneficio.service';
import { RegistroBeneficioController } from './registro-beneficio.controller';
import { RegistroBeneficio } from './entities/registro-beneficio.entity';
import { Beneficio } from 'src/beneficios/entities/beneficio.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RegistroBeneficioController],
  providers: [RegistroBeneficioService],
  imports: [
    TypeOrmModule.forFeature([RegistroBeneficio, Beneficio, Usuario]),
  ],
})
export class RegistroBeneficioModule {}
