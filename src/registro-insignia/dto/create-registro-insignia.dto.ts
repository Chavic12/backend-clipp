import { IsDate, IsInt, IsOptional } from "class-validator";

export class CreateRegistroInsigniaDto {
    @IsInt()
    usuarioId: number;
    @IsInt()
    insigniaId: number;
    @IsDate()
    @IsOptional()
    fechaCompletado?: Date;
}
