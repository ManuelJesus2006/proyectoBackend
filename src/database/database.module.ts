import { Module, Global } from '@nestjs/common';
import { AstraService } from './database.provider';

@Global() // Esto hace que no tengas que importar el DatabaseModule en cada módulo que lo use
@Module({
  providers: [AstraService],
  exports: [AstraService], // ¡Importante! Permite que otros usen el servicio
})
export class DatabaseModule {}