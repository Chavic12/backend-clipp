import { ApiProperty } from "@nestjs/swagger";
import { Actividade } from "src/actividades/entities/actividade.entity";
import { RegistroInsignia } from "src/registro-insignia/entities/registro-insignia.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Insignia {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    titulo: string;
    @Column('text')
    descripcion: string;
    @Column('text', {nullable: true})
    @ApiProperty({
        description: 'Imagen del beneficio',
        type: 'string',  // Puedes cambiar esto si el tipo de imagen es diferente
        format: 'binary',  // Esto indica que es un archivo binario (como una imagen)
        example: 'insignias.jpg',  // Ejemplo del nombre de la imagen
      })
    imagenUrl: string;
    @Column('text')
    tipo: string;

    @OneToMany(() => RegistroInsignia, registro => registro.insignia)
    registros: RegistroInsignia[];

    @ManyToOne(() => Actividade, actividad => actividad.insignias, { onDelete: 'CASCADE', nullable: true })
    actividad?: Actividade;

}
