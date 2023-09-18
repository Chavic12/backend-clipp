import { ApiProperty } from '@nestjs/swagger';
import { Insignia } from 'src/insignias/entities/insignia.entity';
import { RegistroActividad } from 'src/registro-actividad/entities/registro-actividad.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actividade {
    @ApiProperty(
        {
            description: 'Identificador de la actividad',
            example: 1,
            uniqueItems: true
        }
    )
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty(
        {
            description: 'Nombre de la actividad',
            example: 'Actividad 1'
        }
    )
    @Column('text')
    nombre: string;
    @ApiProperty({
        description: 'Descripción de la actividad',
        example: 'Actividad 1'
    })
    @Column('text')
    descripcion: string;
    @ApiProperty({
        description: 'Puntaje de la actividad',
        example: 100
    })
    @Column('double')
    total: number;
    @OneToMany(() => RegistroActividad, registro => registro.actividad,)
    registros: RegistroActividad[];
    @OneToMany( () => Insignia, insignia => insignia.actividad,)
    insignias: Insignia[];

}
