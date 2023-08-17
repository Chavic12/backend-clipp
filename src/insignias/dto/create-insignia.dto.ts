import { IsIn, IsInt, IsString } from "class-validator";

export class CreateInsigniaDto {
    @IsString()
    titulo: string;
    @IsString()
    descripcion: string;
    @IsIn(['fidelización', 'usabilidad'])
    tipo: string;
    @IsString()
    imagenUrl?: string;

    @IsInt()
    actividadId: number;
}
