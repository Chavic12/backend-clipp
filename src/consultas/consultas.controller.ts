import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Consultas')
@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}
  @Get('top-fidelizacion')
  async getTopFidelizacionInsignias() {
    const topInsignias = await this.consultasService.getTopFidelizacionInsignias();
    return topInsignias;
  }
  @Get('top-usabilidad')
  async getTopUsabilidadInsignias(): Promise<any[]> {
    return this.consultasService.getTopUsabilidadInsignias();
  }

  @Get('insignias')
  async obtenerInsigniasUltimos4Meses() {
    return this.consultasService.obtenerInsigniasUltimos4Meses();
  }
  @Get('top')
  async getTopUsuarios() {
    const topUsuarios = await this.consultasService.getTopUsuarios();
    return topUsuarios;
  }
  @Get('tabla')
  async getUsuariosConInsigniasYBeneficios() {
    return this.consultasService.getUsuariosConInsigniasYBeneficios();
  }

  @Get('tabla2')
  async getUsuariosConInsigniasYBeneficios2() {
    return this.consultasService.getUsabilidadInsignias();
  }
}
