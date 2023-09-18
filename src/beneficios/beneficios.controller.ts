import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BeneficiosService } from './beneficios.service';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Beneficio } from './entities/beneficio.entity';

@ApiTags('Beneficios')
@Controller('beneficios')
export class BeneficiosController {
  constructor(private readonly beneficiosService: BeneficiosService) {}

  
  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: Beneficio})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @UseInterceptors(FileInterceptor('imagenUrl')) // Usa FileInterceptor para manejar la subida del archivo
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBeneficioDto: CreateBeneficioDto,
  ) {
    console.log(file);
    return this.beneficiosService.create(createBeneficioDto, file);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.beneficiosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beneficiosService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagenUrl')) // Usa FileInterceptor para manejar la subida del archivo
  update(
    @Param('id') id: string,
    @Body() updateBeneficioDto: UpdateBeneficioDto,
    @UploadedFile() file: Express.Multer.File, // El archivo de imagen subido
  ) {
    return this.beneficiosService.update(+id, updateBeneficioDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beneficiosService.remove(+id);
  }
}
