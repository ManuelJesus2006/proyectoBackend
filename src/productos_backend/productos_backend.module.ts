import { Module } from '@nestjs/common';
import { ProductosBackendService } from './productos_backend.service';
import { ProductosBackendController } from './productos_backend.controller';

@Module({
  controllers: [ProductosBackendController],
  providers: [ProductosBackendService],
})
export class ProductosBackendModule {}
