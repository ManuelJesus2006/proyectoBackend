import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthBackendService } from './auth_backend.service';
import { CreateAuthBackendDto } from './dto/create-auth_backend.dto';
import { UpdateAuthBackendDto } from './dto/update-auth_backend.dto';
import { LoginAuthBackendDto } from './dto/login-auth.backend.dto';

@Controller('api/v1/techProducts/auth')
export class AuthBackendController {
  constructor(private readonly authBackendService: AuthBackendService) {}

  @Post('/signup')
  create(@Body() createAuthBackendDto: CreateAuthBackendDto) {
    return this.authBackendService.create(createAuthBackendDto);
  }

  @Post('/login')
  login(@Body() loginAuthBackendDto: LoginAuthBackendDto) {
    return this.authBackendService.login(loginAuthBackendDto);
  }

  // @Delete('/delete')
  // delete(){
  //   return this.authBackendService.delete();
  // }


  // @Get()
  // findAll() {
  //   return this.authBackendService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authBackendService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthBackendDto: UpdateAuthBackendDto) {
  //   return this.authBackendService.update(+id, updateAuthBackendDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authBackendService.remove(+id);
  // }
}
