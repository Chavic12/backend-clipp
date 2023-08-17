import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { RegistroBeneficioService } from './registro-beneficio.service';
import { CreateRegistroBeneficioDto } from './dto/create-registro-beneficio.dto';

@Controller('registro-beneficio')
export class RegistroBeneficioController {
  constructor(
    private readonly registroBeneficioService: RegistroBeneficioService,
  ) {}

  @Post()
  create(@Body() createRegistroBeneficioDto: CreateRegistroBeneficioDto) {
    return this.registroBeneficioService.createRegistro(
      createRegistroBeneficioDto,
    );
  }
}
