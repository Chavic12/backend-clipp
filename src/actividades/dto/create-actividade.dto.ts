import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateActividadeDto {
    @ApiProperty({
        description: 'Nombre de la actividad',
        example: 'Actividad 1',
        nullable: false
    })
    @IsString()
    @MinLength(1)
    nombre: string;

    @ApiProperty({
        description: 'Descripción de la actividad',
        example: 'Actividad 1',
    })
    @IsString()
    @MinLength(1)
    descripcion: string;
    @ApiProperty({
        description: 'Puntaje de la actividad',
        example: 100
    })
    @IsDecimal()
    @IsOptional()
    total?: number;

}


