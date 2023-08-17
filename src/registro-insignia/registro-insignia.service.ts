import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRegistroInsigniaDto } from './dto/create-registro-insignia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroInsignia } from './entities/registro-insignia.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Insignia } from 'src/insignias/entities/insignia.entity';

@Injectable()
export class RegistroInsigniaService {

  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(RegistroInsignia)
    private readonly registroInsigniaRepository: Repository<RegistroInsignia>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Insignia)
    private readonly insigniaRepository: Repository<Insignia>,
    
  ) {}

  async createRegistro(createRegistroInsigniaDto: CreateRegistroInsigniaDto): Promise<RegistroInsignia> {
    const idUsuario = createRegistroInsigniaDto.usuarioId;
    const idInsignia = createRegistroInsigniaDto.insigniaId;
    console.log(idUsuario)
    const usuario = await this.usuarioRepository.findOneBy({id: idUsuario});
    const insignia = await this.insigniaRepository.findOneBy({id: idInsignia});
    console.log(usuario)

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
    }
  
    if (!insignia) {
      throw new NotFoundException(`Insignia con ID ${idInsignia} no encontrada`);
    }
  

    createRegistroInsigniaDto.fechaCompletado = new Date();

    try {
      const registro = this.registroInsigniaRepository.create({
        usuario, 
        insignia, 
        fechaCompletado: new Date(),
      });
  
      await this.registroInsigniaRepository.save(registro);
      return registro;
    } catch (error) {
      this.handleDBExceptions(error);
    }
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
