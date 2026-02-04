import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Headers, Res } from '@nestjs/common';
import { ProductosBackendService } from './productos_backend.service';
import { CreatePutProductosBackendDto } from './dto/create-put-productos_backend.dto';
import { ProductoFilterBackendDto } from './dto/filter_productos_backend.dto';
import { PatchProductosBackendDto } from './dto/patch-productos_backend.dto';
import type { Response } from 'express';

@Controller('api/v1/techProducts')
export class ProductosBackendController {
  constructor(private readonly productosBackendService: ProductosBackendService) {}

  @Post('/')
  create(@Body() createProductosBackendDto: CreatePutProductosBackendDto, @Headers('api_key') api_key:string) {
    return this.productosBackendService.createNewProduct(createProductosBackendDto, api_key);
  }

  @Get('/')
  findAll(@Query() filters: ProductoFilterBackendDto, @Headers('api_key') api_key:string) {
    return this.productosBackendService.findAll(filters, api_key);
  }

  @Get(':id')
  findById(@Param('id') id: string, @Headers('api_key') api_key:string) {
    return this.productosBackendService.findById(+id, api_key);
  }
  

  @Put(':id')
  put(@Param('id') id:string, @Body() createProductosBackendDto:CreatePutProductosBackendDto, @Headers('api_key') api_key:string){
    return this.productosBackendService.majorUpdateProduct(createProductosBackendDto,+id,api_key)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() patchProductosBackendDto: PatchProductosBackendDto, @Headers('api_key') api_key:string) {
    return this.productosBackendService.minorUpdate(+id, patchProductosBackendDto, api_key);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('api_key') api_key:string, @Res() res: Response) {
    return this.productosBackendService.deleteById(+id, api_key, res);
  }

  
}
