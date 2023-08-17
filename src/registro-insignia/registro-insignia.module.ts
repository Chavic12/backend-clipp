import { Module } from '@nestjs/common';
import { RegistroInsigniaService } from './registro-insignia.service';
import { RegistroInsigniaController } from './registro-insignia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insignia } from 'src/insignias/entities/insignia.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RegistroInsignia } from './entities/registro-insignia.entity';

@Module({
  controllers: [RegistroInsigniaController],
  providers: [RegistroInsigniaService],
  imports: [
    TypeOrmModule.forFeature([
      RegistroInsignia,
      Usuario,
      Insignia
    ])
  ]
})
export class RegistroInsigniaModule {}
