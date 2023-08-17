import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publicidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: true })
    imagenUrl: string;

}
