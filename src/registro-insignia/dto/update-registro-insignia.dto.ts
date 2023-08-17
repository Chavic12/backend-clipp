import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroInsigniaDto } from './create-registro-insignia.dto';

export class UpdateRegistroInsigniaDto extends PartialType(CreateRegistroInsigniaDto) {}
