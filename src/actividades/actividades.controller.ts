import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Actividade } from './entities/actividade.entity';


@ApiTags('Actividades')
@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: Actividade})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  create(@Body() createActividadeDto: CreateActividadeDto) {
    return this.actividadesService.create(createActividadeDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.actividadesService.findAll(paginationDto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actividadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActividadeDto: UpdateActividadeDto) {
    return this.actividadesService.update(+id, updateActividadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actividadesService.remove(+id);
  }
}
