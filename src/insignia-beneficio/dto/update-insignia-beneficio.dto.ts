import { PartialType } from '@nestjs/mapped-types';
import { CreateInsigniaBeneficioDto } from './create-insignia-beneficio.dto';

export class UpdateInsigniaBeneficioDto extends PartialType(CreateInsigniaBeneficioDto) {}
