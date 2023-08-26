import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroInsignia } from 'src/registro-insignia/entities/registro-insignia.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(RegistroInsignia)
    private readonly registroInsigniaRepository: Repository<RegistroInsignia>,
    ) {}

    async getTopFidelizacionInsignias(): Promise<any[]> {
      const query = this.registroInsigniaRepository
        .createQueryBuilder('ri')
        .select(['i.titulo AS insignia_nombre', 'COUNT(ri.insigniaId) AS cantidad_obtenida'])
        .leftJoin('ri.insignia', 'i')
        .where('i.tipo = :tipo', { tipo: 'fidelización' }) // Filtrar por tipo "Fidelización"
        .groupBy('ri.insigniaId')
        .orderBy('cantidad_obtenida', 'DESC')
        .limit(10);
    
      return query.getRawMany();
    }

    async getTopUsabilidadInsignias(): Promise<any[]> {
      const query = this.registroInsigniaRepository
        .createQueryBuilder('ri')
        .select(['i.titulo AS insignia_nombre', 'COUNT(ri.insigniaId) AS cantidad_obtenida'])
        .leftJoin('ri.insignia', 'i')
        .where('i.tipo = :tipo', { tipo: 'Usabilidad' }) // Filtrar por tipo "Usabilidad"
        .groupBy('ri.insigniaId')
        .orderBy('cantidad_obtenida', 'DESC')
        .limit(10);
    
      return query.getRawMany();
    }
    
    

}
