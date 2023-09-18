import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publicidad {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'Identificador de la publicidad',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Imagen de la publicidad',
        type: 'string',  // Puedes cambiar esto si el tipo de imagen es diferente
        format: 'binary',  // Esto indica que es un archivo binario (como una imagen)
        example: 'pbulicidad.jpg',  // Ejemplo del nombre de la imagen
      })
    @Column('text', { nullable: true })
    imagenUrl: string;

    @ApiProperty({
        description: 'Ruta de la publicidad',
        example: 'profile',
    })
    @Column('text', { nullable: true })
    ruta: string;

}
