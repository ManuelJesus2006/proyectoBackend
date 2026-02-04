import { Test, TestingModule } from '@nestjs/testing';
import { ProductosBackendService } from './productos_backend.service';

describe('ProductosBackendService', () => {
  let service: ProductosBackendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductosBackendService],
    }).compile();

    service = module.get<ProductosBackendService>(ProductosBackendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
