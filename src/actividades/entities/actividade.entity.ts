import { Insignia } from 'src/insignias/entities/insignia.entity';
import { RegistroActividad } from 'src/registro-actividad/entities/registro-actividad.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actividade {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    nombre: string;
    @Column('text')
    descripcion: string;

    @Column('double')
    total: number;

    @OneToMany(() => RegistroActividad, registro => registro.actividad,)
    registros: RegistroActividad[];

    @OneToMany( () => Insignia, insignia => insignia.actividad,)
    insignias: Insignia[];

}
