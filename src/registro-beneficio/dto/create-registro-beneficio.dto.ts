import { IsDate, IsInt, IsOptional } from "class-validator";

export class CreateRegistroBeneficioDto {
    @IsInt()
    usuarioId: number;
    @IsInt()
    beneficioId: number;
    @IsDate()
    @IsOptional()
    fechaCompletado?: Date;
}
