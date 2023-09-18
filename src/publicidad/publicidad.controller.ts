import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { PublicidadService } from './publicidad.service';
import { CreatePublicidadDto } from './dto/create-publicidad.dto';
import { UpdatePublicidadDto } from './dto/update-publicidad.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Publicidad')
@Controller('publicidad')
export class PublicidadController {
  constructor(private readonly publicidadService: PublicidadService) {}
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: CreatePublicidadDto})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @Post()
  @UseInterceptors(FileInterceptor('imagenUrl')) // Usa FileInterceptor para manejar la subida del archivo

  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPublicidadDto: CreatePublicidadDto
    ) {
    return this.publicidadService.create(createPublicidadDto, file);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.publicidadService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicidadService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagenUrl')) // Usa FileInterceptor para manejar la subida del archivo
  update(
    @Param('id') id: string, 
    @Body() updatePublicidadDto: UpdatePublicidadDto,
    @UploadedFile() file: Express.Multer.File, // El archivo de imagen subido
    ) {
    return this.publicidadService.update(+id, updatePublicidadDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicidadService.remove(+id);
  }
}
