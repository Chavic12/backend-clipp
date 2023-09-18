import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @ApiProperty({
        description: 'Cantidad de registros a mostrar',
        example: 10
    })
    @IsOptional()
    @IsPositive()
    @Type( () => Number)
    limit: number;
    @ApiProperty({
        description: 'Cantidad de registros a saltar',
        example: 0
    })
    @IsOptional()
    @Min(0)
    @Type( () => Number)
    offset?: number;
}