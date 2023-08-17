import { IsInt, IsString } from "class-validator";

export class CreateBeneficioDto {
    @IsString()
    descripcion: string;
    @IsString()
    cupon: string;
    @IsString()
    imagenUrl?: string;
    @IsString()
    descuento: string;

}
