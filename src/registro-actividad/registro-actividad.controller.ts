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

@Controller('registro-actividad')
export class RegistroActividadController {
  constructor(
    private readonly registroActividadService: RegistroActividadService,
  ) {}

  @Post()
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistroActividadDto: UpdateRegistroActividadDto,
  )
  {
    return this.registroActividadService.update(+id, updateRegistroActividadDto);
  }
  
}
