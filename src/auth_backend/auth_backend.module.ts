import { Module } from '@nestjs/common';
import { AuthBackendService } from './auth_backend.service';
import { AuthBackendController } from './auth_backend.controller';

@Module({
  controllers: [AuthBackendController],
  providers: [AuthBackendService],
  imports: []
})
export class AuthBackendModule {}