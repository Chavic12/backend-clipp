import { Insignia } from "src/insignias/entities/insignia.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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


