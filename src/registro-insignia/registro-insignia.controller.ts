import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { RegistroInsigniaService } from './registro-insignia.service';
import { CreateRegistroInsigniaDto } from './dto/create-registro-insignia.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('RegistroInsignia')
@Controller('registro-insignia')
export class RegistroInsigniaController {
  constructor(
    private readonly registroInsigniaService: RegistroInsigniaService,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: CreateRegistroInsigniaDto})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  create(@Body() createRegistroInsigniaDto: CreateRegistroInsigniaDto) {
    return this.registroInsigniaService.createRegistro(createRegistroInsigniaDto);
  }
}
