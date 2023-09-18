import { PartialType } from '@nestjs/swagger';
import { CreateRegistroInsigniaDto } from './create-registro-insignia.dto';

export class UpdateRegistroInsigniaDto extends PartialType(CreateRegistroInsigniaDto) {}
