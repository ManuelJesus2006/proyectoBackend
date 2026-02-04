import { Test, TestingModule } from '@nestjs/testing';
import { AuthBackendController } from './auth_backend.controller';
import { AuthBackendService } from './auth_backend.service';

describe('AuthBackendController', () => {
  let controller: AuthBackendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthBackendController],
      providers: [AuthBackendService],
    }).compile();

    controller = module.get<AuthBackendController>(AuthBackendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
