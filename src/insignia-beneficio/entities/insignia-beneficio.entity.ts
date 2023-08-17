import { Beneficio } from "src/beneficios/entities/beneficio.entity";
import { Insignia } from "src/insignias/entities/insignia.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InsigniaBeneficio {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => Insignia, insignia => insignia.id)
    insignia: Insignia;

    @ManyToOne( () => Beneficio, beneficio => beneficio.id)
    beneficio: Beneficio;
}
