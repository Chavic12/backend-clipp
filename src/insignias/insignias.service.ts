import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateInsigniaDto } from './dto/create-insignia.dto';
import { UpdateInsigniaDto } from './dto/update-insignia.dto';
import { Insignia } from './entities/insignia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Actividade } from 'src/actividades/entities/actividade.entity';

@Injectable()
export class InsigniasService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Insignia)
    private readonly insigniaRepository: Repository<Insignia>,
    @InjectRepository(Actividade)
    private readonly actividadRepository: Repository<Actividade>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createInsigniaDto: CreateInsigniaDto,
    file: Express.Multer.File,
  ) {
    const idActividad = createInsigniaDto.actividadId;

    const actividad = await this.actividadRepository.findOneBy({
      id: idActividad,
    });

    if( idActividad) {
      const actividad = await this.actividadRepository.findOneBy({
        id: idActividad,
      })
    }

    if (!actividad) {
      throw new NotFoundException(
        `Actividad con ID ${idActividad} no encontrado`,
      );
    }

    try {
      const newInsignia = this.insigniaRepository.create({
        ...createInsigniaDto,
      });
      if (idActividad) {
        newInsignia.actividad = await this.actividadRepository.findOneBy({
          id: idActividad,
        });
      }
      const savedInsignia = await this.insigniaRepository.save(newInsignia);

      const uploadedImage: UploadApiResponse | UploadApiErrorResponse =
        await this.cloudinaryService.uploadImage(file, savedInsignia.id);

      // Actualiza el beneficio con la URL de la imagen subida
      savedInsignia.imagenUrl = uploadedImage.secure_url;
      await this.insigniaRepository.save(savedInsignia);

      // Aquí asumes que tienes los IDs de las actividades asociadas en createInsigniaDto
      return savedInsignia;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.insigniaRepository.find({
      take: limit,
      skip: offset,
      relations: {
        actividad: true,
      },
    });
  }

  async findOne(id: number) {
    const queryBuilder = this.insigniaRepository.createQueryBuilder('insignia');
    const insignia = await queryBuilder
      .where('insignia.id = :id', { id })
      .leftJoinAndSelect('insignia.actividad', 'actividad')
      .getOne();

    if (!insignia) {
      throw new NotFoundException(`Insignia #${id} not found`);
    }

    return insignia;
  }

  async getInsigniasForUsuario(userId: number) {
  return this.insigniaRepository
    .createQueryBuilder('insignia')
    .leftJoinAndSelect('insignia.actividad', 'actividad')
    .leftJoinAndSelect('actividad.registros', 'registro', 'registro.usuario = :userId', { userId })
    .leftJoinAndSelect('registro.usuario', 'usuario')
    .getMany();
}


  


  async update(
    id: number,
    updateInsigniaDto: UpdateInsigniaDto,
    file?: Express.Multer.File,
  ) {
    const idActividad = updateInsigniaDto.actividadId;
    const actividad = await this.actividadRepository.findOneBy({
      id: idActividad,
    });

    if (!actividad) {
      throw new NotFoundException(
        `Actividad con ID ${idActividad} no encontrado`,
      );
    }

    const insignia = await this.insigniaRepository.preload({
      id: id,
      titulo: updateInsigniaDto.titulo,
      descripcion: updateInsigniaDto.descripcion,
      imagenUrl: updateInsigniaDto.imagenUrl,
      tipo: updateInsigniaDto.tipo,
      actividad,
    });

    if (!insignia) throw new NotFoundException(`Insignia #${id} not found`);
    if (file) {
      const uploadedImage: UploadApiResponse | UploadApiErrorResponse =
        await this.cloudinaryService.uploadImage(file, insignia.id);
      insignia.imagenUrl = uploadedImage.secure_url;
    }

    return this.insigniaRepository.save(insignia);
  }

  async remove(id: number) {
    const insignia = await this.findOne(id);
    if (insignia.imagenUrl) {
      // Borra la imagen de Cloudinary
      const publicId = insignia.imagenUrl.split('/').pop(); // Obtiene el ID público de Cloudinary

      await this.cloudinaryService.deleteImage(publicId);
    }
    await this.insigniaRepository.remove(insignia);
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
