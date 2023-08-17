import { IsDate, IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class CreateRegistroActividadDto {
    @IsInt()
    usuarioId: number;
    @IsInt()
    actividadId: number;
    @IsString()
    @IsOptional()
    estado?: string;
    @IsDate()
    @IsOptional()
    fechaCompletado?: Date;
}
