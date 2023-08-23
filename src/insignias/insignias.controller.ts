import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { InsigniasService } from './insignias.service';
import { CreateInsigniaDto } from './dto/create-insignia.dto';
import { UpdateInsigniaDto } from './dto/update-insignia.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('insignias')
export class InsigniasController {
  constructor(private readonly insigniasService: InsigniasService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagenUrl')) // Usa FileInterceptor para manejar la subida del archivo
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createInsigniaDto: CreateInsigniaDto
    ) {
    return this.insigniasService.create(createInsigniaDto, file);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.insigniasService.findAll(paginationDto);
  }

  @Get('todo/:id')
  findOneTodo(@Param('id') id: string) {
    return this.insigniasService.getInsigniaDetailsById(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insigniasService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagenUrl')) // Usa FileInterceptor para manejar la subida del archivo
  update(
    @Param('id') id: string, 
    @Body() updateInsigniaDto: UpdateInsigniaDto,
    @UploadedFile() file: Express.Multer.File, // El archivo de imagen subido
    ) {
    return this.insigniasService.update(+id, updateInsigniaDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insigniasService.remove(+id);
  }
}
