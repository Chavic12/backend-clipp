import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';
import { Beneficio } from './entities/beneficio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';


@Injectable()
export class BeneficiosService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Beneficio)
    private readonly beneficioRepository: Repository<Beneficio>,
    private cloudinaryService: CloudinaryService
  ) { }

  async create(createBeneficioDto: CreateBeneficioDto, file: Express.Multer.File): Promise<Beneficio> {
    try {
      const beneficio = this.beneficioRepository.create({
        ...createBeneficioDto,
      });
      const savedBeneficio = await this.beneficioRepository.save(beneficio);

      const uploadedImage: UploadApiResponse | UploadApiErrorResponse = await this.cloudinaryService.uploadImage(file, savedBeneficio.id);
      
      // Actualiza el beneficio con la URL de la imagen subida
      savedBeneficio.imagenUrl = uploadedImage.secure_url;
      await this.beneficioRepository.save(savedBeneficio);
      return savedBeneficio;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.beneficioRepository.find({
      take: limit,
      skip: offset,
      // TODO: RELACIONES
    });
  }

  async findOne(id: number) {
    const beneficio = await this.beneficioRepository.findOneBy({ id })
    if( !beneficio ) throw new NotFoundException(`Beneficio #${id} not found`);
    return beneficio;
  }

  async update(id: number, updateBeneficioDto: UpdateBeneficioDto, file?: Express.Multer.File) {
    const beneficio = await this.beneficioRepository.preload({
      id: id,
      ...updateBeneficioDto
    })

    if( !beneficio ) throw new NotFoundException(`Beneficio #${id} not found`);
    if (file) {
      // Sube la imagen a Cloudinary usando el ID del beneficio
      const uploadedImage: UploadApiResponse | UploadApiErrorResponse = await this.cloudinaryService.uploadImage(file, beneficio.id);
  
      // Actualiza el beneficio con la URL de la nueva imagen subida
      beneficio.imagenUrl = uploadedImage.secure_url;
    }
  
    return this.beneficioRepository.save(beneficio);
  }

  async remove(id: number) {
    const beneficio = await this.findOne(id);
    if( beneficio.imagenUrl) {
      // Borra la imagen de Cloudinary
      const publicId = beneficio.imagenUrl.split('/').pop(); // Obtiene el ID público de Cloudinary

      await this.cloudinaryService.deleteImage(publicId);
      
    }
    await this.beneficioRepository.remove(beneficio);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs!!',
    );
  }
}
