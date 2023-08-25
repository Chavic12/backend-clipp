import { Beneficio } from "src/beneficios/entities/beneficio.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@Index(['usuario', 'beneficio'], { unique: true }) // Índice único en las relaciones
export class RegistroBeneficio {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => Usuario, usuario => usuario.id)
    usuario: Usuario;

    @ManyToOne( () => Beneficio, beneficio => beneficio.id)
    beneficio: Beneficio;

    @Column('timestamp', {nullable: true})
    fechaCompletado: Date;

}
