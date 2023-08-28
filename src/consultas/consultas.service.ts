import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Insignia } from 'src/insignias/entities/insignia.entity';
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
    @InjectRepository(Insignia)
    private readonly insigniaRepository: Repository<Insignia>,
  ) {}

  async getTopFidelizacionInsignias(): Promise<any[]> {
    const query = this.registroInsigniaRepository
      .createQueryBuilder('ri')
      .select([
        'i.titulo AS insignia_nombre',
        'COUNT(ri.insigniaId) AS cantidad_obtenida',
      ])
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
      .select([
        'i.titulo AS insignia_nombre',
        'COUNT(ri.insigniaId) AS cantidad_obtenida',
      ])
      .leftJoin('ri.insignia', 'i')
      .where('i.tipo = :tipo', { tipo: 'Usabilidad' }) // Filtrar por tipo "Usabilidad"
      .groupBy('ri.insigniaId')
      .orderBy('cantidad_obtenida', 'DESC')
      .limit(10);

    return query.getRawMany();
  }

  async obtenerInsigniasUltimos4Meses() {
    const query = this.registroInsigniaRepository
      .createQueryBuilder('insignia')
      .select('DATE_FORMAT(insignia.fechaCompletado, "%M")', 'mes')
      .addSelect('COUNT(insignia.id)', 'cantidad_obtenida')
      .where(
        'insignia.fechaCompletado >= DATE_SUB(CURDATE(), INTERVAL 4 MONTH)',
      )
      .groupBy('mes')
      .orderBy('MIN(insignia.fechaCompletado)', 'ASC')
      .getRawMany();

    return query;
  }

  async getTopUsuarios() {
    return this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoin('usuario.insignias', 'registroInsignia')
      .leftJoin('usuario.cupones', 'registroBeneficio')
      .addSelect('usuario.id', 'usuario_id')
      .addSelect('COUNT(registroInsignia.id)', 'total_insignias')
      .addSelect('COUNT(registroBeneficio.id)', 'total_beneficios')
      .groupBy('usuario.id')
      .addGroupBy('usuario.nombre') // Añadir esta línea para resolver el error
      .orderBy('total_insignias', 'DESC')
      .addOrderBy('total_beneficios', 'DESC')
      .take(5)
      .getRawMany();
  }

  async getUsuariosConInsigniasYBeneficios(): Promise<any[]> {
    return this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.insignias', 'registroInsignia')
      .leftJoinAndSelect('usuario.cupones', 'registroBeneficio')
      .leftJoinAndSelect('registroInsignia.insignia', 'insignia', 'insignia.tipo = :tipo', { tipo: 'fidelización' })
      .select([
        'usuario.nombre AS nombre_usuario',
        'COUNT(DISTINCT registroInsignia.id) AS total_insignias_fidelizacion',
        'COUNT(DISTINCT registroBeneficio.id) AS total_beneficios',
      ])
      .groupBy('usuario.id, usuario.nombre')
      .orderBy('total_insignias_fidelizacion', 'DESC')
      .addOrderBy('total_beneficios', 'DESC')
      .getRawMany();
  }

  async getUsabilidadInsignias() {
    return this.registroInsigniaRepository
      .createQueryBuilder('ri')
      .select('i.titulo', 'nombre_insignia')
      .addSelect('COUNT(DISTINCT ri.usuarioId)', 'cantidad_usuarios')
      .innerJoin('ri.insignia', 'i')
      .where('i.tipo = :tipo', { tipo: 'usabilidad' })
      .groupBy('i.id, i.titulo')
      .orderBy('cantidad_usuarios', 'DESC')
      .getRawMany();
  }
}
