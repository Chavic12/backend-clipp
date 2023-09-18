import { ApiProperty } from "@nestjs/swagger";
import { Insignia } from "src/insignias/entities/insignia.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(['usuario', 'insignia'], { unique: true }) // Índice único en las relaciones
export class RegistroInsignia {

    @ApiProperty({
        description: 'Identificador del registro de insignia',
        example: 1,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => Usuario, usuario => usuario.id, { onDelete: 'CASCADE' })
    usuario: Usuario;

    @ManyToOne( () => Insignia, insignia => insignia.id, { onDelete: 'CASCADE' })
    insignia: Insignia;

    @ApiProperty({
        description: 'Fecha completado de la insignia',
        example: '2021-06-01T00:00:00.000Z',
    })
    @Column('timestamp', {nullable: true})
    fechaCompletado: Date;
}


