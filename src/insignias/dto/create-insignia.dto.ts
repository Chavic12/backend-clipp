import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsString } from "class-validator";

export class CreateInsigniaDto {
    @IsString()
    @ApiProperty({
        description: 'Titulo de la insignia',
        example: 'Insignia 1',
    })
    titulo: string;
    @IsString()
    @ApiProperty({
        description: 'Descripción de la insignia',
        example: 'Insignia 1',
    })
    descripcion: string;
    @ApiProperty({
        description: 'Tipo de la insignia',
        example: 'fidelización',
    })
    @IsIn(['fidelización', 'usabilidad'])
    tipo: string;
    @IsString()
    @ApiProperty({
        description: 'Imagen de la insignia',
        type: 'string',  // Puedes cambiar esto si el tipo de imagen es diferente
        format: 'binary',  // Esto indica que es un archivo binario (como una imagen)
        example: 'insignias.jpg',  // Ejemplo del nombre de la imagen
      })
    imagenUrl?: string;
    @IsInt()
    @ApiProperty({
        description: 'Identificador de la actividad',
        example: 1,
    })
    actividadId?: number;
}
