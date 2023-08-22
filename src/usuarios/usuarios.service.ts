import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }
  


  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = this.usuarioRepository.create(createUsuarioDto);
      await this.usuarioRepository.save(usuario);
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
      // TODO: RELACIONES 
    })
    return usuarios;
  }

  async getUserWithInsigniasAndBeneficios(userId: number) {
    const queryBuilder = this.usuarioRepository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.insignias', 'insignias')
      .leftJoinAndSelect('usuario.cupones', 'cupones')
      .where('usuario.id = :userId', { userId })
      .getOne();
  
    return queryBuilder;
  }

  async getUserWithActividades(userId: number) {

    const queryBuilder = this.usuarioRepository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.registroActividad', 'registros')
      .leftJoinAndSelect('registros.actividad', 'actividad')
      .where('usuario.id = :userId', { userId })
      .getOne();
  
    return queryBuilder;
  }
  
  

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id })
    if( !usuario ) throw new NotFoundException(`Usuario #${id} not found`);
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.preload({
      id: id,
      ...updateUsuarioDto
    })

    if( !usuario ) throw new NotFoundException(`Usuario #${id} not found`);
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
