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
import { ConsultasModule } from './consultas/consultas.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql', // Cambiamos 'postgres' a 'mysql' para MySQL
      host: 'containers-us-west-43.railway.app',
      port: 6834,
      database: 'railway',
      username: 'root',
      password: 'GS8kta2SAyh5s5vn00y9',
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        sql_mode: 'NO_ENGINE_SUBSTITUTION,NO_AUTO_CREATE_USER',
      },
      
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
    ConsultasModule,
  ],

})
export class AppModule {}
