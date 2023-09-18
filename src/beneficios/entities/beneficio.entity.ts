import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Beneficio {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'Identificador del beneficio',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Título del beneficio',
        example: 'Beneficio 1',
    })
    @Column('text')
    titulo: string;

    @ApiProperty({
        description: 'Descripción del beneficio',
        example: 'Beneficio 1',
    })
    @Column('text')
    descripcion: string;

    @ApiProperty({
        description: 'Cupón del beneficio',
        example: 'Beneficio 1',
    })
    @Column('text')
    cupon: string;

    @ApiProperty({
        description: 'Imagen del beneficio',
        type: 'string',  // Puedes cambiar esto si el tipo de imagen es diferente
        format: 'binary',  // Esto indica que es un archivo binario (como una imagen)
        example: 'Beneficio_1.jpg',  // Ejemplo del nombre de la imagen
      })
    @Column('text', { nullable: true })
    imagenUrl: string;

    @ApiProperty({
        description: 'Descuento del beneficio',
        example: '11 %',
    })
    @Column('text')
    descuento: string;

    @ApiProperty({
        description: 'Fecha de vencimiento del beneficio',
        example: '2021-10-10 00:00:00',
    })
    @Column('timestamp', { nullable: true })
    fecha: Date;

}
