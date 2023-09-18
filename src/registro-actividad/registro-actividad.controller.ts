import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegistroActividadService } from './registro-actividad.service';
import { CreateRegistroActividadDto } from './dto/create-registro-actividad.dto';
import { UpdateRegistroActividadDto } from './dto/update-registro-actividad.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('RegistroActividad')
@Controller('registro-actividad')
export class RegistroActividadController {
  constructor(
    private readonly registroActividadService: RegistroActividadService,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: CreateRegistroActividadDto})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  async createRegistro(@Body() createRegistroDto: CreateRegistroActividadDto) {
    return this.registroActividadService.createRegistro(createRegistroDto);
  }

  @Patch(':id/completar')
  updateCompletado(
    @Param('id') id: string,
    @Body() updateRegistroActividadDto: UpdateRegistroActividadDto,
  ) {
    return this.registroActividadService.updateEstadoCompletado(
      +id,
      updateRegistroActividadDto,
    );
  }

  @Patch(':userId/actividad/:actividadId')
  update(
    @Param('userId') userId: string,
    @Param('actividadId') actividadId: string,
    @Body() updateRegistroActividadDto: UpdateRegistroActividadDto,
  ) {
    return this.registroActividadService.updateRegistroActividad(
      +userId,
      +actividadId,
      updateRegistroActividadDto,
    );
  }
}
