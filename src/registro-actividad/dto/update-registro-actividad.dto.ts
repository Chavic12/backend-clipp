import { PartialType } from '@nestjs/swagger';
import { CreateRegistroActividadDto } from './create-registro-actividad.dto';

export class UpdateRegistroActividadDto extends PartialType(CreateRegistroActividadDto) {}
