import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @MinLength(1)
    nombre: string;

    @IsEmail()
    correo: string;
    
  }
  