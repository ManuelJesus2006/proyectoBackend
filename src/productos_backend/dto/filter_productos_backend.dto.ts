import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class ProductoFilterBackendDto {
  @ApiProperty({ 
    example: 'AMD', 
    description: 'Filter by manufacturer', 
    required: false 
  })
  @IsOptional()
  @IsString()
  business: string;

  @ApiProperty({ 
    example: 'Ryzen', 
    description: 'Filter by product name (partial search)', 
    required: false 
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ 
    example: 'Processor', 
    description: 'Filter by product category', 
    required: false 
  })
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty({ 
    example: 500, 
    description: 'Filter by price (exact or max depending on logic)', 
    required: false 
  })
  @IsOptional()
  @Type(() => Number) // Convierte el string de la URL a numero
  @IsNumber()
  price: number;

  @ApiProperty({ 
    example: 'desc', 
    description: 'Sort order (asc or desc)', 
    required: false 
  })
  @IsOptional()
  @IsString()
  sort: string;

  @ApiProperty({ 
    example: 10, 
    description: 'Limit the number of results', 
    required: false 
  })
  @IsOptional()
  @Type(() => Number) // Convierte el string de la URL a numero
  @IsNumber()
  limit: Number;
}