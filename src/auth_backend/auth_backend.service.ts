import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthBackendDto } from './dto/create-auth_backend.dto';
import { Usuario } from './entities/auth_backend.entity';
import { LoginAuthBackendDto } from './dto/login-auth.backend.dto';
import bcrypt from 'bcryptjs';
import { AstraService } from 'src/database/database.provider';
import * as crypto from 'crypto';
import { UpdateAuthBackendDto } from './dto/update-auth_backend.dto';
import { NotFoundError } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class AuthBackendService {

  constructor(
    private readonly astra: AstraService
  ) { }

  // Helper para no repetir código de la colección
  private get usuarioCollection() {
    return this.astra.db.collection<Usuario>('users');
  }

  async deleteOne(api_key: string, id: string, res: Response) {
    if (!api_key) {
      throw new UnauthorizedException('An apiKey for administrators is required to perform this operation, please go to /api/v1/techProducts/auth/signup to create your account or go to /api/v1/techProducts/auth/login to view your apikey. After this contact the creator. If you wish, you can check the docs here: /api/v1/techProducts/docs')
    } else if (!(await this.apiKeyValidAdmin(api_key))) {
      throw new UnauthorizedException(`Your apikey is either not an administrator one or not valid, contact the creator or the administrator`)
    }

    try {
      await this.usuarioCollection.deleteOne({ _id: id });
      res.status(204).send();
    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }
  }

  async updateAdministratorFieldById(updateAuthBackendDto: UpdateAuthBackendDto, id: string, api_key: string) {
    if (!api_key) {
      throw new UnauthorizedException('An apiKey for administrators is required to perform this operation, please go to /api/v1/techProducts/auth/signup to create your account or go to /api/v1/techProducts/auth/login to view your apikey. After this contact the creator. If you wish, you can check the docs here: /api/v1/techProducts/docs')
    } else if (!(await this.apiKeyValidAdmin(api_key))) {
      throw new UnauthorizedException(`Your apikey is either not an administrator one or not valid, contact the creator or the administrator`)
    }

    const userToUpdate = await this.usuarioCollection.findOne({ _id: id })
    if (!userToUpdate) {
      throw new NotFoundException('The id you introduced does not correspond to any user')
    }

    try {
      const updatedUser = {
        ...userToUpdate,
        administrator: updateAuthBackendDto.administrator
      }
      await this.usuarioCollection.findOneAndReplace({ _id: id }, updatedUser, { returnDocument: 'after' })
      return updatedUser;
    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }
  }

  async showAllUsers(api_key: string) {
    if (!api_key) {
      throw new UnauthorizedException('An apiKey for administrators is required to perform this operation, please go to /api/v1/techProducts/auth/signup to create your account or go to /api/v1/techProducts/auth/login to view your apikey. After this contact the creator. If you wish, you can check the docs here: /api/v1/techProducts/docs')
    } else if (!(await this.apiKeyValidAdmin(api_key))) {
      throw new UnauthorizedException(`Your apikey is either not an administrator one or not valid, contact the creator or the administrator`)
    }

    const allUsers = await this.usuarioCollection.find({}).toArray()
    return allUsers
  }

  async create(createAuthBackendDto: CreateAuthBackendDto) {

    const { pass, ...datos } = createAuthBackendDto;

    const existeEmailUser = await this.usuarioCollection.findOne({ email: datos.email })
    if (existeEmailUser) {
      throw new ConflictException('The email you inserted already exists in an account, try changing it')
    }
    try {
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
      if (e.status === 409) throw new BadRequestException('This user already exists');

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

  //Funcion que revisa si la apiKey es de algún usuario de la base de datos que ES administrador y además es válida
  async apiKeyValidAdmin(api_key: string) {
    const user = await this.usuarioCollection.findOne({ api_key: api_key, administrator: true });
    if (user) return true;
    return false;
  }
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
