import { Actividade } from "src/actividades/entities/actividade.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RegistroActividad {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => Usuario, usuario => usuario.id)
    usuario: Usuario;

    @ManyToOne( () => Actividade, actividad => actividad.id)
    actividad: Actividade;

    @Column('text')
    estado: string;

    @Column('timestamp', {nullable: true})
    fechaCompletado: Date;
}
