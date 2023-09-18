import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Usuario 1',
  })
  @IsString()
  @MinLength(1)
  nombre: string;
  @ApiProperty({
    description: 'Correo del usuario',
    example: 'xavier@gmail.com',
  })
  @IsEmail()
  correo: string;
}
