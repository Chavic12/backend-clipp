import { IsInt } from "class-validator";

export class CreateInsigniaBeneficioDto {
    @IsInt()
    beneficioId;
    @IsInt()
    insigniaId;
}
