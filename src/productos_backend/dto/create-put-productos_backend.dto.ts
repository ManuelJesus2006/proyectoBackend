import { IsString, IsEnum, IsNumber, IsUrl, IsOptional, IsDate, ValidateNested } from "class-validator";
import { Characteristics } from "../entities/productos_backend.entity"; // <--- Tu import original
import { Type } from "class-transformer";
import { CharacteristicsDto } from "./characteristics_backend_dto";
import { ApiProperty } from "@nestjs/swagger";

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

export class CreatePutProductosBackendDto {
  
    @ApiProperty({ 
        example: 'NVIDIA', 
        description: 'Product manufacturer or brand' 
    })
    @IsString({
      message: 'Business field is compulsory'
    })
    business: string;

    @ApiProperty({ 
        example: 'GeForce RTX 4090', 
        description: 'Specific model name of the product' 
    })
    @IsString({
      message: 'Name field is compulsory'
    })
    name: string;

    @ApiProperty({ 
        enum: ProductType,
        example: ProductType.GRAPHICS_CARD, 
        description: 'Category of the product' 
    })
    @IsEnum(ProductType, {
        message: 'Product type is not valid. Options are: ' + Object.values(ProductType).join(', ')
    })
    type: ProductType;

    @ApiProperty({ 
        example: 1599.99, 
        description: 'Price in Euros', 
        minimum: 0
    })
    @IsNumber()
    price: number;

    @ApiProperty({ 
        example: 'https://example.com/images/gpu-rtx4090.jpg', 
        description: 'Public URL of the product image' 
    })
    @IsUrl()
    imageUrl: string;

    @ApiProperty({ 
        example: '2022-10-12', 
        description: 'Product release date (YYYY-MM-DD)' 
    })
    @Type(() => Date)
    @IsDate({
        message: 'The date format must be: YYYY-MM-DD'
    })
    release_date: Date;

    @ApiProperty({ 
        type: () => CharacteristicsDto,
        description: 'Technical specifications (Optional)',
        required: false
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => CharacteristicsDto)
    characteristics: Characteristics;
}