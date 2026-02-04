import { Test, TestingModule } from '@nestjs/testing';
import { ProductosBackendController } from './productos_backend.controller';
import { ProductosBackendService } from './productos_backend.service';

describe('ProductosBackendController', () => {
  let controller: ProductosBackendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosBackendController],
      providers: [ProductosBackendService],
    }).compile();

    controller = module.get<ProductosBackendController>(ProductosBackendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
