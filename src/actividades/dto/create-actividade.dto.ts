import { IsDecimal, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateActividadeDto {
    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    descripcion: string;

    @IsDecimal()
    @IsOptional()
    total?: number;

    @IsDecimal()
    @IsOptional()
    progreso?: number;
}


