import { IsString } from "class-validator";

export class CreatePublicidadDto {
    @IsString()
    imagenUrl?: string;
}
