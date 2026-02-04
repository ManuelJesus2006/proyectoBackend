import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthBackendDto } from './create-auth_backend.dto';

export class UpdateAuthBackendDto extends PartialType(CreateAuthBackendDto) {}
