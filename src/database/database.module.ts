import { Module, Global } from '@nestjs/common';
import { AstraService } from './database.provider';

@Global()
@Module({
  providers: [AstraService],
  exports: [AstraService],
})
export class DatabaseModule {}