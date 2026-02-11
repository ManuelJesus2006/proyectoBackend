import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthBackendModule } from './auth_backend/auth_backend.module';
import { DatabaseModule } from './database/database.module';
import { ProductosBackendModule } from './productos_backend/productos_backend.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    DatabaseModule,

    AuthBackendModule,

    ProductosBackendModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}