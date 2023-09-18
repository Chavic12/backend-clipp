import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsTimeZone } from "class-validator";
import { IsNull } from "typeorm";

export class CreatePublicidadDto {
    @IsString()
    @ApiProperty({
        description: 'Imagen de la publicidad',
        type: 'string',  // Puedes cambiar esto si el tipo de imagen es diferente
        format: 'binary',  // Esto indica que es un archivo binario (como una imagen)
        example: 'publicidad.jpg',  // Ejemplo del nombre de la imagen
      })
    imagenUrl?: string;

    @ApiProperty({
        description: 'Ruta de la publicidad',
        example: 'profile',
    })
    @IsOptional()
    ruta?: string;

}
