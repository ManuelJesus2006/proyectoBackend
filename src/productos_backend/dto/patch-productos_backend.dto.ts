import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Characteristics } from '../entities/productos_backend.entity';
import { CharacteristicsDto } from './characteristics_backend_dto';
import { ApiProperty } from '@nestjs/swagger'; // <--- Importamos esto

export enum ProductType {
    PROCESSOR = 'Processor',
    GRAPHICS_CARD = 'Graphics Card',
    MOTHERBOARD = 'Motherboard',
    RAM = 'RAM',
    SSD = 'SSD',
    CPU_COOLER = 'CPU Cooler',
    POWER_SUPPLY = 'Power Supply',
    HDD = 'HDD'
}

export class PatchProductosBackendDto {
    
    @ApiProperty({ 
        example: 'AMD', 
        description: 'Product manufacturer or brand',
        required: false 
    })
    @IsOptional()
    @IsString({
        message: 'Business field is compulsory'
    })
    business: string;

    @ApiProperty({ 
        example: 'Ryzen 7 5800X3D', 
        description: 'Specific model name of the product',
        required: false 
    })
    @IsOptional()
    @IsString({
        message: 'Name field is compulsory'
    })
    name: string;

    @ApiProperty({ 
        enum: ProductType,
        example: ProductType.PROCESSOR, 
        description: 'Category of the product',
        required: false 
    })
    @IsOptional()
    @IsEnum(ProductType, {
        message: 'Product type is not valid. Options are: ' + Object.values(ProductType).join(', ')
    })
    type: ProductType;

    @ApiProperty({ 
        example: 350.50, 
        description: 'Price in Euros',
        required: false 
    })
    @IsOptional()
    @IsNumber()
    price: number;

    @ApiProperty({ 
        example: 'https://example.com/images/cpu.jpg', 
        description: 'Public URL of the product image',
        required: false 
    })
    @IsOptional()
    @IsUrl()
    imageUrl: string;

    @ApiProperty({ 
        example: '2023-05-20', 
        description: 'Product release date (YYYY-MM-DD)',
        required: false 
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate({
        message: 'The date format must be: YYYY-MM-DD'
    })
    release_date: Date;

    @ApiProperty({ 
        type: () => CharacteristicsDto, // Le decimos a Swagger que mire el DTO para saber qué campos pintar
        description: 'Technical specifications object',
        required: false 
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => CharacteristicsDto)
    characteristics: Characteristics; 
}