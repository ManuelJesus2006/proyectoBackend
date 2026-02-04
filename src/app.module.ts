import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthBackendModule } from './auth_backend/auth_backend.module';
import { DatabaseModule } from './database/database.module';
import { ProductosBackendModule } from './productos_backend/productos_backend.module';

@Module({
  imports: [
    // 1. Configuración de variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Tu nuevo módulo de conexión a Astra DB
    DatabaseModule,

    // 3. Tus módulos de lógica de negocio
    AuthBackendModule,

    ProductosBackendModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}