import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CommonModule } from './common/common.module';
import { ActividadesModule } from './actividades/actividades.module';
import { PublicidadModule } from './publicidad/publicidad.module';
import { InsigniasModule } from './insignias/insignias.module';
import { BeneficiosModule } from './beneficios/beneficios.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RegistroActividadModule } from './registro-actividad/registro-actividad.module';
import { RegistroInsigniaModule } from './registro-insignia/registro-insignia.module';
import { RegistroBeneficioModule } from './registro-beneficio/registro-beneficio.module';
import { InsigniaBeneficioModule } from './insignia-beneficio/insignia-beneficio.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, 
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsuariosModule,
    CommonModule,
    ActividadesModule,
    PublicidadModule,
    InsigniasModule,
    BeneficiosModule,
    CloudinaryModule,
    RegistroActividadModule,
    RegistroInsigniaModule,
    RegistroBeneficioModule,
    InsigniaBeneficioModule,
  ],

})
export class AppModule {}
