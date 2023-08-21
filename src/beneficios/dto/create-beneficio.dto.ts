import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class CreateBeneficioDto {
    @IsString()
    descripcion: string;
    @IsString()
    cupon: string;
    @IsString()
    imagenUrl?: string;
    @IsString()
    descuento: string;
    @IsDate()
    @IsOptional()
    fecha?: Date;
}
