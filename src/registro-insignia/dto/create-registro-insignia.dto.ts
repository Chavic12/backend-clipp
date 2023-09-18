import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional } from "class-validator";

export class CreateRegistroInsigniaDto {
    @ApiProperty({
        description: 'Identificador del usuario',
        example: 1,
    })
    @IsInt()
    usuarioId: number;
    @IsInt()
    @ApiProperty({
        description: 'Identificador de la insignia',
        example: 1,
    })
    insigniaId: number;
    @IsDate()
    @IsOptional()
    @ApiProperty({
        description: 'Fecha completado de la insignia',
        example: '2021-06-01T00:00:00.000Z',
    })
    fechaCompletado?: Date;
}
