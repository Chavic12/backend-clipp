// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateActividadeDto } from './create-actividade.dto';

export class UpdateActividadeDto extends PartialType(CreateActividadeDto) {}
