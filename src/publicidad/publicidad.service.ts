import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePublicidadDto } from './dto/create-publicidad.dto';
import { UpdatePublicidadDto } from './dto/update-publicidad.dto';
import { Publicidad } from './entities/publicidad.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class PublicidadService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Publicidad)
    private readonly publicidadRepository: Repository<Publicidad>,
    private cloudinaryService: CloudinaryService
  ) { }

  async create(createPublicidadDto: CreatePublicidadDto, file: Express.Multer.File) {
    try {
      console.log(file)
      const publicidad = this.publicidadRepository.create({
        ...createPublicidadDto,
      });
      const savedPublicidad = await this.publicidadRepository.save(publicidad);

      const uploadedImage: UploadApiResponse | UploadApiErrorResponse = await this.cloudinaryService.uploadImage(file, savedPublicidad.id);
      
      // Actualiza el beneficio con la URL de la imagen subida
      savedPublicidad.imagenUrl = uploadedImage.secure_url;
      await this.publicidadRepository.save(savedPublicidad);
      return savedPublicidad;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.publicidadRepository.find({
      take: limit,
      skip: offset,
      // TODO: RELACIONES
    });
  }

  async findOne(id: number) {
    const publicidad = await this.publicidadRepository.findOneBy({ id })
    if( !publicidad ) throw new NotFoundException(`Beneficio #${id} not found`);
    return publicidad;
  }

  async update(id: number, updatePublicidadDto: UpdatePublicidadDto, file?: Express.Multer.File) {
    const publicidad = await this.publicidadRepository.preload({
      id: id,
      ...updatePublicidadDto
    })

    if( !publicidad ) throw new NotFoundException(`Beneficio #${id} not found`);
    if (file) {
      const uploadedImage: UploadApiResponse | UploadApiErrorResponse = await this.cloudinaryService.uploadImage(file, publicidad.id);
      publicidad.imagenUrl = uploadedImage.secure_url;
    }
  
    return this.publicidadRepository.save(publicidad);
  }

  async remove(id: number) {
    const publicidad = await this.findOne(id);
    if( publicidad.imagenUrl) {
      // Borra la imagen de Cloudinary
      const publicId = publicidad.imagenUrl.split('/').pop(); // Obtiene el ID público de Cloudinary

      await this.cloudinaryService.deleteImage(publicId);
      
    }
    await this.publicidadRepository.remove(publicidad);
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
