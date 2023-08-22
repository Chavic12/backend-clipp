import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Beneficio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    titulo: string;

    @Column('text')
    descripcion: string;

    @Column('text')
    cupon: string;

    @Column('text', { nullable: true })
    imagenUrl: string;

    @Column('text')
    descuento: string;

    @Column('date', { nullable: true })
    fecha: Date;

}
