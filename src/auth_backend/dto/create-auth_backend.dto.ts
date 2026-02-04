import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthBackendDto {
    @ApiProperty({ 
        example: 'john.doe@example.com', 
        description: 'User email address for registration',
        required: true
    })
    @IsEmail({}, {
        message: 'The email format is invalid'
    })
    email: string;

    @ApiProperty({ 
        example: 'John Doe', 
        description: 'Full name of the user',
        required: true
    })
    @IsString()
    name: string;

    @ApiProperty({ 
        example: 'secretPass123', 
        description: 'Password for the account', 
        minLength: 5,
        required: true 
    })
    @IsString()
    @MinLength(5, {
        message: 'Password must be at least 5 characters long'
    })
    pass: string;
}