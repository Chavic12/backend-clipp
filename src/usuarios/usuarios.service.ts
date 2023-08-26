import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Actividade } from 'src/actividades/entities/actividade.entity';
import { RegistroActividad } from 'src/registro-actividad/entities/registro-actividad.entity';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Actividade)
    private readonly actividadRepository: Repository<Actividade>,
    @InjectRepository(RegistroActividad)
    private readonly registroActividadRepository: Repository<RegistroActividad>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = this.usuarioRepository.create(createUsuarioDto);
      const actividades = await this.actividadRepository.find();
      await this.usuarioRepository.save(usuario);
      for ( const actividad of actividades) { 
        const registro = this.registroActividadRepository.create({
          usuario,
          actividad,
          estado: false,
          progreso: 0,
        });
        await this.registroActividadRepository.save(registro);
      }


      return usuario;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const usuarios = await this.usuarioRepository.find({
      take: limit,
      skip: offset,
      relations: {
        insignias: true,
        registroActividad: true,
      },
      // TODO: RELACIONES
    });
    return usuarios;
  }

  //   async getUserWithInsigniasAndBeneficios(userId: number) {
  //   const queryBuilder = this.usuarioRepository.createQueryBuilder('usuario')
  //     .select([
  //       'usuario.id',
  //       'usuario.nombre',
  //       'usuario.correo'
  //     ])
  //     .addSelect('insignias.id', 'insignia_id')
  //     .addSelect('insignias.fechaCompletado')
  //     .addSelect('detalleInsignia.id', 'idInsigna')
  //     .addSelect('detalleInsignia.titulo')
  //     .addSelect('detalleInsignia.descripcion')
  //     .addSelect('detalleInsignia.imagenUrl')
  //     .addSelect('detalleInsignia.tipo')
  //     .addSelect('detalleCupon.id', 'idBeneficio')
  //     .addSelect('detalleCupon.titulo', 'tituloBeneficio')
  //     .addSelect('detalleCupon.descripcion', 'descripcionBeneficio')
  //     .addSelect('detalleCupon.cupon')
  //     .addSelect('detalleCupon.imagenUrl', 'imagenUrlBeneficio')
  //     .addSelect('detalleCupon.descuento')
  //     .addSelect('detalleCupon.fecha')
  //     .leftJoin('usuario.insignias', 'insignias')
  //     .leftJoin('insignias.insignia', 'detalleInsignia')
  //     .leftJoin('usuario.cupones', 'cupones')
  //     .leftJoin('cupones.beneficio', 'detalleCupon')
  //     .where('usuario.id = :userId', { userId })
  //     .getRawOne();

  //   return queryBuilder;
  // }
  async getUserWithInsigniasAndBeneficios(userId: number) {
    const queryBuilder = this.usuarioRepository.createQueryBuilder('usuario')
      .where('usuario.id = :userId', { userId })
      .leftJoinAndSelect('usuario.insignias', 'insignias')
      .leftJoinAndSelect('insignias.insignia', 'detalleInsignia')
      .leftJoinAndSelect('usuario.cupones', 'cupones')
      .leftJoinAndSelect('cupones.beneficio', 'detalleCupon')
      .addSelect('insignias.id', 'insignia_id')
      .addSelect('insignias.fechaCompletado', 'insignias_fechaCompletado')
      .addSelect('detalleInsignia.id', 'idInsignia')
      .addSelect('detalleInsignia.titulo', 'detalleInsignia_titulo')
      .addSelect('detalleInsignia.descripcion', 'detalleInsignia_descripcion')
      .addSelect('detalleInsignia.imagenUrl', 'detalleInsignia_imagenUrl')
      .addSelect('detalleInsignia.tipo', 'detalleInsignia_tipo')
      .addSelect('cupones.id', 'cupon_id')
      .addSelect('detalleCupon.id', 'idBeneficio')
      .addSelect('detalleCupon.titulo', 'tituloBeneficio')
      .addSelect('detalleCupon.descripcion', 'descripcionBeneficio')
      .addSelect('detalleCupon.cupon', 'detalleCupon_cupon')
      .addSelect('detalleCupon.imagenUrl', 'imagenUrlBeneficio')
      .addSelect('detalleCupon.descuento', 'detalleCupon_descuento')
      .addSelect('detalleCupon.fecha', 'detalleCupon_fecha');
  
    const results = await queryBuilder.getRawMany();
  
    if (results && results.length > 0) {
      const usuario = {
        id: results[0].usuario_id,
        nombre: results[0].usuario_nombre,
        correo: results[0].usuario_correo,
        insignias: results[0].insignia_id ? results.map(result => ({
         
          id: result.idInsignia,
          titulo: result.detalleInsignia_titulo,
          descripcion: result.detalleInsignia_descripcion,
          imagenUrl: result.detalleInsignia_imagenUrl,
          tipo: result.detalleInsignia_tipo,
        })) : [],
        cupones: results[0].cupon_id ? results.map(result => ({
          
          id: result.idBeneficio,
          titulo: result.tituloBeneficio,
          descripcion: result.descripcionBeneficio,
          cupon: result.detalleCupon_cupon,
          imagenUrl: result.imagenUrlBeneficio,
          descuento: result.detalleCupon_descuento,
          fecha: result.detalleCupon_fecha,
        })) : [],
      };
  
      return usuario;
    }
  
    return null;
  }
  
  async getUserWithActividades(userId: number) {
    const queryBuilder = this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.registroActividad', 'registrosActividades')
      .leftJoinAndSelect('registrosActividades.actividad', 'actividad')
      .leftJoinAndSelect('actividad.insignias', 'insignias')
      .where('usuario.id = :userId', { userId });

    return queryBuilder.getOne();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException(`Usuario #${id} not found`);
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.preload({
      id: id,
      ...updateUsuarioDto,
    });

    if (!usuario) throw new NotFoundException(`Usuario #${id} not found`);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
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
