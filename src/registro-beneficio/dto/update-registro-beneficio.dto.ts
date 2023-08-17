import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroBeneficioDto } from './create-registro-beneficio.dto';

export class UpdateRegistroBeneficioDto extends PartialType(CreateRegistroBeneficioDto) {}
