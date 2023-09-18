import { ApiProperty } from '@nestjs/swagger';
import { RegistroActividad } from 'src/registro-actividad/entities/registro-actividad.entity';
import { RegistroBeneficio } from 'src/registro-beneficio/entities/registro-beneficio.entity';
import { RegistroInsignia } from 'src/registro-insignia/entities/registro-insignia.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @ApiProperty({
    description: 'Identificador del usuario',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Usuario 1',
  })
  @Column('text')
  nombre: string;

  @ApiProperty({
    description: 'Correo del usuario',
    example: 'xavi@gmail.com'
  })
  @Column('text')
  correo: string;

  @OneToMany(() => RegistroActividad, registro => registro.usuario)
  registroActividad: RegistroActividad[];

  @OneToMany(() => RegistroInsignia, regInsignia => regInsignia.usuario)
  insignias: RegistroInsignia[];

  @OneToMany(() => RegistroBeneficio, regBeneficio => regBeneficio.usuario)
  cupones: RegistroBeneficio[];
}
