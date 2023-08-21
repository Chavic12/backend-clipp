import { IsBoolean, IsDate, IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class CreateRegistroActividadDto {
    @IsInt()
    usuarioId: number;
    @IsInt()
    actividadId: number;
    @IsBoolean()
    @IsOptional()
    estado?: boolean;
    @IsDate()
    @IsOptional()
    fechaCompletado?: Date;
    @IsOptional()
    progreso?: number;
}
