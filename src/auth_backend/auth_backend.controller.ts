import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Res } from '@nestjs/common';
import { AuthBackendService } from './auth_backend.service';
import { CreateAuthBackendDto } from './dto/create-auth_backend.dto';
import { UpdateAuthBackendDto } from './dto/update-auth_backend.dto';
import { LoginAuthBackendDto } from './dto/login-auth.backend.dto';
import type { Response } from 'express';

@Controller('api/v1/techProducts/auth')
export class AuthBackendController {
  constructor(private readonly authBackendService: AuthBackendService) {}

  @Get()
  showAllUsers(@Headers('api_key') api_key:string){
    return this.authBackendService.showAllUsers(api_key)
  }

  @Post('/signup')
  create(@Body() createAuthBackendDto: CreateAuthBackendDto) {
    return this.authBackendService.create(createAuthBackendDto);
  }

  @Post('/login')
  login(@Body() loginAuthBackendDto: LoginAuthBackendDto) {
    return this.authBackendService.login(loginAuthBackendDto);
  }

  @Patch(':id')
  updateAdministratorField(@Body() updateAuthBackendDto: UpdateAuthBackendDto, @Headers('api_key') api_key:string, @Param('id') id: string){
    return this.authBackendService.updateAdministratorFieldById(updateAuthBackendDto, id, api_key)
  }

  @Delete(':id')
  delete(@Headers('api_key') api_key:string, @Param('id') id: string, @Res() res: Response){
    return this.authBackendService.deleteOne(api_key, id,res);
  }
}
