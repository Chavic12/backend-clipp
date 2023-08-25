import { Insignia } from "src/insignias/entities/insignia.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(['usuario', 'insignia'], { unique: true }) // Índice único en las relaciones
export class RegistroInsignia {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => Usuario, usuario => usuario.id)
    usuario: Usuario;

    @ManyToOne( () => Insignia, insignia => insignia.id)
    insignia: Insignia;

    @Column('timestamp', {nullable: true})
    fechaCompletado: Date;
}


