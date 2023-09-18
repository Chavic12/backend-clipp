import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class CreateRegistroActividadDto {
    @IsInt()
    @ApiProperty({
        description: 'Identificador del usuario',
        example: 1,
    })
    usuarioId: number;
    @IsInt()
    @ApiProperty({
        description: 'Identificador de la actividad',
        example: 1,
    })
    actividadId: number;
    @ApiProperty({
        description: 'Fecha completado de la actividad',
    })
    @IsDate()
    @IsOptional()
    fechaCompletado?: Date;
    @ApiProperty({
        description: 'Progreso de la actividad',
        example: 100,
    })
    @IsOptional()
    progreso?: number;
}
