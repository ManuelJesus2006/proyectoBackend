import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthBackendDto } from './create-auth_backend.dto';
import { IsBoolean } from 'class-validator';

export class UpdateAuthBackendDto{
    @IsBoolean({
        message: "You must ONLY introduce 'true' or 'false' on the administrator field"
    })
    administrator: boolean
}
