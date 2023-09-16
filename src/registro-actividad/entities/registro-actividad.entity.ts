import { Actividade } from "src/actividades/entities/actividade.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RegistroActividad {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => Usuario, usuario => usuario.id, { onDelete: 'CASCADE' })
    usuario: Usuario;

    @ManyToOne( () => Actividade, actividad => actividad.id, { onDelete: 'CASCADE' })
    actividad: Actividade;

    @Column('double', { nullable: true })
    progreso: number;

    @Column('timestamp', {nullable: true})
    fechaCompletado: Date;
}
