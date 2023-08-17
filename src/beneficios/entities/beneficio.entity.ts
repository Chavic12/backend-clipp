import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Beneficio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    descripcion: string;

    @Column('text')
    cupon: string;

    @Column('text', { nullable: true })
    imagenUrl: string;

    @Column('text')
    descuento: string;

}
