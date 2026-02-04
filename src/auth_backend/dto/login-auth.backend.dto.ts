import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthBackendDto {
    @ApiProperty({ 
        example: 'john.doe@example.com', 
        description: 'Registered user email address',
        required: true
    })
    @IsEmail({}, {
        message: 'The email format is invalid'
    })
    email: string;

    @ApiProperty({ 
        example: 'secretPass123', 
        description: 'User password', 
        minLength: 5,
        required: true 
    })
    @IsString()
    @MinLength(5, {
        message: 'Password must be at least 5 characters long'
    })
    pass: string;
}