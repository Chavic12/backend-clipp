import { PartialType } from '@nestjs/swagger';
import { CreatePublicidadDto } from './create-publicidad.dto';

export class UpdatePublicidadDto extends PartialType(CreatePublicidadDto) {}
