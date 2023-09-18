import { ApiProperty } from "@nestjs/swagger";
import { Actividade } from "src/actividades/entities/actividade.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RegistroActividad {
    @ApiProperty({
        description: 'Identificador del registro de actividad',
        example: 1,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => Usuario, usuario => usuario.id, { onDelete: 'CASCADE' })
    usuario: Usuario;

    @ManyToOne( () => Actividade, actividad => actividad.id, { onDelete: 'CASCADE' })
    actividad: Actividade;

    @ApiProperty({
        description: 'Progreso de la actividad',
        example: 100,
    })
    @Column('double', { nullable: true })
    progreso: number;

    @ApiProperty({
        description: 'Fecha completado de la actividad',
        example: '2021-06-01T00:00:00.000Z',
    })
    @Column('timestamp', {nullable: true})
    fechaCompletado: Date;
}
