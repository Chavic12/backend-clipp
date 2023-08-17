import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InsigniaBeneficioService } from './insignia-beneficio.service';
import { CreateInsigniaBeneficioDto } from './dto/create-insignia-beneficio.dto';
import { UpdateInsigniaBeneficioDto } from './dto/update-insignia-beneficio.dto';

@Controller('insignia-beneficio')
export class InsigniaBeneficioController {
  constructor(
    private readonly insigniaBeneficioService: InsigniaBeneficioService,
  ) {}

  @Post()
  create(@Body() createInsigniaBeneficioDto: CreateInsigniaBeneficioDto) {
    return this.insigniaBeneficioService.createRegistro(createInsigniaBeneficioDto);
  }

}
