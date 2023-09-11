import { IsOptional, IsString, IsTimeZone } from "class-validator";
import { IsNull } from "typeorm";

export class CreatePublicidadDto {
    @IsString()
    imagenUrl?: string;

    @IsOptional()
    ruta?: string;

}
