import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class CreateBeneficioDto {
    @ApiProperty({
        description: 'Titulo del beneficio',
        example: 1,
    })
    @IsString()
    titulo: string;
    @ApiProperty({
        description: 'Descripción del beneficio',
        example: 'Beneficio 1',
    })
    @IsString()
    descripcion: string;
    @IsString()
    @ApiProperty({
        description: 'Cupón del beneficio',
        example: 'asd-123',
    })
    cupon: string;
    @IsString()
    @ApiProperty({
        description: 'Imagen del beneficio',
        type: 'string',  // Puedes cambiar esto si el tipo de imagen es diferente
        format: 'binary',  // Esto indica que es un archivo binario (como una imagen)
        example: 'Beneficio_1.jpg',  // Ejemplo del nombre de la imagen
      })
    imagenUrl?: string;
    @IsString()
    @ApiProperty({
        description: 'Descuento del beneficio',
        example: '11 %',
    })
    descuento: string;
    @ApiProperty({
        description: 'Fecha de vencimiento del beneficio',
        example: '2021-10-10 00:00:00',
    })
    @IsDate()
    @IsOptional()
    fecha?: Date;
}
