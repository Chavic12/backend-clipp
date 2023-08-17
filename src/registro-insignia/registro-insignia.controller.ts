import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { RegistroInsigniaService } from './registro-insignia.service';
import { CreateRegistroInsigniaDto } from './dto/create-registro-insignia.dto';

@Controller('registro-insignia')
export class RegistroInsigniaController {
  constructor(
    private readonly registroInsigniaService: RegistroInsigniaService,
  ) {}

  @Post()
  create(@Body() createRegistroInsigniaDto: CreateRegistroInsigniaDto) {
    return this.registroInsigniaService.createRegistro(createRegistroInsigniaDto);
  }
}
