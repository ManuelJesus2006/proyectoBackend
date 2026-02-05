import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthBackendDto } from './dto/create-auth_backend.dto';
import { Usuario } from './entities/auth_backend.entity';
import { LoginAuthBackendDto } from './dto/login-auth.backend.dto';
import bcrypt from 'bcryptjs';
import { AstraService } from 'src/database/database.provider';
import * as crypto from 'crypto';

@Injectable()
export class AuthBackendService {

  constructor(
    private readonly astra: AstraService
  ) { }

  // Helper para no repetir código de la colección
  private get usuarioCollection() {
    return this.astra.db.collection<Usuario>('users');
  }

  async create(createAuthBackendDto: CreateAuthBackendDto) {
    try {
      const { pass, ...datos } = createAuthBackendDto;

      const nuevoUsuario = {
        ...datos,
        pass: bcrypt.hashSync(pass, 10),
        api_key: crypto.randomBytes(30).toString('hex'),
        administrator: false
      };

      await this.usuarioCollection.insertOne(nuevoUsuario);

      return {
        message: "Your account has been created successfully",
        "Welcome, your name is ": nuevoUsuario.name,
        "Your email": nuevoUsuario.email,
        "Your apikey: ": nuevoUsuario.api_key
      };

    } catch (e) {
      if (e.status === 409) throw new BadRequestException('El usuario ya existe');

      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }
  }

  async login(loginDto: LoginAuthBackendDto) {
    try {
      const { pass, email } = loginDto;

      const userLogued = await this.usuarioCollection.findOne({ email });

      if (!userLogued) {
        throw new UnauthorizedException('El email introducido no existe');
      }

      if (!bcrypt.compareSync(pass, userLogued.pass)) {
        throw new UnauthorizedException('Usuario o contraseña no válidos');
      }

      return {
        "Welcome, your name is ": userLogued.name,
        "Your email": userLogued.email,
        "Your apikey: ": userLogued.api_key
      };
    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }

  }

  // async delete() {
  //   await this.usuarioCollection.deleteOne({
  //     _id: "28da6d81-4e1d-45ac-9a6d-814e1dc5ac79" // <--- EL ID QUE QUIERES BORRAR
  //   });
  // }

  // findAll() {
  //   return `This action returns all authBackend`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} authBackend`;
  // }

  // update(id: number, updateAuthBackendDto: UpdateAuthBackendDto) {
  //   return `This action updates a #${id} authBackend`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} authBackend`;
  // }
}
