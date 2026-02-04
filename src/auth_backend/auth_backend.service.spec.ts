import { Test, TestingModule } from '@nestjs/testing';
import { AuthBackendService } from './auth_backend.service';

describe('AuthBackendService', () => {
  let service: AuthBackendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthBackendService],
    }).compile();

    service = module.get<AuthBackendService>(AuthBackendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
