import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePutProductosBackendDto } from './dto/create-put-productos_backend.dto';
import { AstraService } from 'src/database/database.provider';
import { Producto } from './entities/productos_backend.entity';
import { ProductoFilterBackendDto } from './dto/filter_productos_backend.dto';
import { filter } from 'rxjs';
import { Usuario } from 'src/auth_backend/entities/auth_backend.entity';
import { PatchProductosBackendDto } from './dto/patch-productos_backend.dto';
import { Response } from 'express';

@Injectable()
export class ProductosBackendService {

  constructor(
    private readonly astra: AstraService
  ) { }

  private get usuarioCollection() {
    return this.astra.db.collection<Usuario>('users');
  }
  private get productsCollection() {
    return this.astra.db.collection<Producto>('products');
  }

  //DELETE A WHOLE PRODUCT
  async deleteById(id: number, api_key: string, res: Response) {
    if (!api_key) {
      throw new UnauthorizedException('An apiKey for administrators is required to perform this operation, please go to /api/v1/techProducts/auth/signup to create your account or go to /api/v1/techProducts/auth/login to view your apikey. After this contact the creator. If you wish, you can check the docs here: /api/v1/techProducts/docs')
    } else if (!(await this.apiKeyValidAdmin(api_key))) {
      throw new UnauthorizedException(`Your apikey is not an administrator one, contact the creator`)
    }

    try {
      await this.productsCollection.deleteOne({ id });
      res.status(204).send();
    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }

  }

  //PATCH UPDATE ONLY A FIELD FROM THE PRODUCT
  async minorUpdate(id: number, patchProductosBackendDto: PatchProductosBackendDto, api_key: string) {
    if (!api_key) {
      throw new UnauthorizedException('An apiKey for administrators is required to perform this operation, please go to /api/v1/techProducts/auth/signup to create your account or go to /api/v1/techProducts/auth/login to view your apikey. After this contact the creator. If you wish, you can check the docs here: /api/v1/techProducts/docs')
    } else if (!(await this.apiKeyValidAdmin(api_key))) {
      throw new UnauthorizedException(`Your apikey is not an administrator one, contact the creator`)
    }

    const productToUpdate = await this.productsCollection.findOne({ id });
    if (!productToUpdate) {
      throw new NotFoundException(`There is no product with id: ${id}`);
    }
    //Cuenta los objetos que hay en el dto para comprobar si se ha introducido solo uno
    const validFields = Object.keys(patchProductosBackendDto).filter(key =>
      patchProductosBackendDto[key] !== undefined && patchProductosBackendDto[key] !== null
    );

    if (validFields.length > 1) {
      throw new BadRequestException('On this mode you must only put one field to update')
    }

    try {
      if (patchProductosBackendDto.business) productToUpdate.business = patchProductosBackendDto.business
      if (patchProductosBackendDto.characteristics) productToUpdate.characteristics = patchProductosBackendDto.characteristics
      if (patchProductosBackendDto.imageUrl) productToUpdate.imageUrl = patchProductosBackendDto.imageUrl
      if (patchProductosBackendDto.name) productToUpdate.name = patchProductosBackendDto.name
      if (patchProductosBackendDto.price) productToUpdate.price = patchProductosBackendDto.price
      if (patchProductosBackendDto.release_date) productToUpdate.release_date = patchProductosBackendDto.release_date
      if (patchProductosBackendDto.type) productToUpdate.type = patchProductosBackendDto.type
      const { id: idViejo, _id, creation_date, update_date, ...rest } = productToUpdate; //Truco para desestructurar

      const productChanged = {

        id: id,
        _id: productToUpdate._id,
        ...rest,
        creation_date: productToUpdate.creation_date,
        update_date: new Date()
      }

      const result = await this.productsCollection.findOneAndReplace(
        { id: id },
        productChanged,
        { returnDocument: 'after' }
      );
      return {
        message: `The product has been updated successfully`,
        product: result
      };

    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }

  }

  //PUT UPDATE ALL FROM THE PRODUCT
  async majorUpdateProduct(createProductosBackendDto: CreatePutProductosBackendDto, id: number, api_key: string) {
    if (!api_key) {
      throw new UnauthorizedException('An apiKey for administrators is required to perform this operation, please go to /api/v1/techProducts/auth/signup to create your account or go to /api/v1/techProducts/auth/login to view your apikey. After this contact the creator. If you wish, you can check the docs here: /api/v1/techProducts/docs')
    } else if (!(await this.apiKeyValidAdmin(api_key))) {
      throw new UnauthorizedException(`Your apikey is not an administrator one, contact the creator`)
    }

    if (await this.existProductUpdate(createProductosBackendDto, id)) {
      throw new BadRequestException(`The product name '${createProductosBackendDto.name}' corresponds to an existing one`)
    }
    const productToUpdate = await this.productsCollection.findOne({ id });
    if (!productToUpdate) {
      throw new NotFoundException(`There is no product with id: ${id}`);
    }
    //Como characteristics es opcional, si el usuario lo actualiza sin los characteristics se ponen los que ya estaban
    if (!createProductosBackendDto.characteristics) createProductosBackendDto.characteristics = productToUpdate.characteristics

    try {
      const productChanged = {
        _id: productToUpdate._id,
        id: id,
        ...createProductosBackendDto,
        creation_date: productToUpdate.creation_date,
        update_date: new Date()
      }

      const result = await this.productsCollection.findOneAndReplace(
        { id: id },
        productChanged,
        { returnDocument: 'after' }
      );
      return {
        message: `The product has been updated successfully`,
        product: result
      };


    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }

  }


  //POST CREATE PRODUCT
  async createNewProduct(createProductosBackendDto: CreatePutProductosBackendDto, api_key: string) {
    if (!api_key) {
      throw new UnauthorizedException('An apiKey for administrators is required to perform this operation, please go to /api/v1/techProducts/auth/signup to create your account or go to /api/v1/techProducts/auth/login to view your apikey. After this contact the creator. If you wish, you can check the docs here: /api/v1/techProducts/docs')
    } else if (!(await this.apiKeyValidAdmin(api_key))) {
      throw new UnauthorizedException(`Your apikey is not an administrator one, contact the creator`)
    }
    if (await this.existProduct(createProductosBackendDto)) {
      throw new BadRequestException(`The product name '${createProductosBackendDto.name}' corresponds to an existing one`)
    }
    try {

      const lastProduct = await this.productsCollection.findOne({}, { sort: { id: -1 } });

      const newId = lastProduct ? lastProduct.id + 1 : 1

      const newProduct = {
        _id: undefined, //Ponemos undefined para que astradb lo gestione solo
        id: newId,
        ...createProductosBackendDto,
        creation_date: new Date(),
        update_date: new Date()
      }

      const resultado = await this.productsCollection.insertOne(newProduct);

      return {
        message: 'Product created successfully',
        product: newProduct
      };

    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }
  }

  //GET ALL OR GET WITH FILTERS
  async findAll(filters: ProductoFilterBackendDto, api_key: string) {
    if (!api_key) {
      throw new UnauthorizedException('An apiKey is required to perform this operation, please go to /api/v1/techProducts/auth/signup to create your account or go to /api/v1/techProducts/auth/login to view your apikey. If you wish, you can check the docs here: /api/v1/techProducts/docs')
    } else if (!(await this.apiKeyValidUser(api_key))) {
      throw new UnauthorizedException(`This apiKey is not valid, check it doing a login here: /api/v1/techProducts/auth/login or you can check the docs here: /api/v1/techProducts/docs`)
    }

    const allProducts = await this.productsCollection.find({}).toArray();
    let filteredProducts = allProducts;

    //Filtro por nombre
    if (filters.name) {
      filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().includes(filters.name.toLowerCase()));
    }
    //Filtro por tipo
    if (filters.type) {
      filteredProducts = filteredProducts.filter((product) => product.type.toLowerCase().includes(filters.type.toLowerCase()));
    }
    //Filtro por empresa
    if (filters.business) {
      filteredProducts = filteredProducts.filter((product) => product.business.toLowerCase() == filters.business.toLowerCase());
    }
    //Límite de precio máximo
    if (filters.price) {
      filteredProducts = filteredProducts.filter((product) => product.price <= filters.price);
    }

    //Ordenación por fecha de lanzamiento
    if (filters.sort) {
      if (filters.sort.toLowerCase() === 'asc') {
        filteredProducts = filteredProducts.sort((a, b) => {
          const p1 = new Date(a.release_date).getTime();
          const p2 = new Date(b.release_date).getTime();
          return p1 - p2;
        });
      } else if (filters.sort.toLowerCase() === 'desc') {
        filteredProducts = filteredProducts.sort((a, b) => {
          const p1 = new Date(a.release_date).getTime();
          const p2 = new Date(b.release_date).getTime();
          return p2 - p1;
        });
      } else {
        throw new BadRequestException("You should have inserted either 'asc' or 'desc' on the 'sort' param");
      }
    }

    if (!filters.sort) {
      filteredProducts = filteredProducts.sort((p1, p2) => p1.id - p2.id);//Este sort es por defecto en el caso de que 
      // el usuario no haya querido ordenar por fecha de lanzamiento
    }

    if (filters.limit) {
      filteredProducts = filteredProducts.slice(0, Number(filters.limit));
    }

    const cleanProducts = filteredProducts.map((product) => {
      const { _id, ...rest } = product; //Sacamos el _id de astradb
      return rest;
    });
    if (cleanProducts.length > 0) return cleanProducts;
    else throw new NotFoundException('There are no products for the filters introduced')
  }

  //GET BY ID
  async findById(id: number, api_key: string) {
    if (!api_key) {
      throw new UnauthorizedException('An apiKey is required to perform this operation, please go to /api/v1/techProducts/auth/signup to create your account or go to /api/v1/techProducts/auth/login to view your apikey. If you wish, you can check the docs here: /api/v1/techProducts/docs')
    } else if (!(await this.apiKeyValidUser(api_key))) {
      throw new UnauthorizedException(`This apiKey is not valid, check it doing a login here: /api/v1/techProducts/auth/login or you can check the docs here: /api/v1/techProducts/docs`)
    }

    let productoEncontrado;

    try {
      productoEncontrado = await this.productsCollection.findOne({ id });
    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }

    if (!productoEncontrado) {
      throw new BadRequestException(`There is no product with the id: ${id}`);
    }

    try {
      return {
        id: productoEncontrado.id,
        business: productoEncontrado.business,
        name: productoEncontrado.name,
        type: productoEncontrado.type,
        price: productoEncontrado.price,
        imageUrl: productoEncontrado.imageUrl,
        release_date: productoEncontrado.release_date,
        characteristics: productoEncontrado.characteristics,
        creation_date: productoEncontrado.creation_date,
        update_date: productoEncontrado.update_date
      };
    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }

  }

  //Función para revisar si un producto ya tiene el mismo nombre al crear
  async existProduct(createProductosBackendDto: CreatePutProductosBackendDto) {
    try {
      const allProducts: Producto[] = await this.productsCollection.find({}).toArray();
      return allProducts.some((prod) => prod.name.trim().toLowerCase() === createProductosBackendDto.name.trim().toLowerCase());
    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }
  }

  //Función para revisar si un producto ya tiene el mismo nombre al actualizar (put o patch)
  async existProductUpdate(createProductosBackendDto: CreatePutProductosBackendDto, idProduct: number) {
    try {
      const allProducts: Producto[] = await this.productsCollection.find({}).toArray();
      return allProducts.some((prod) => {
        if (idProduct != prod.id) {
          if (prod.name.trim().toLowerCase() === createProductosBackendDto.name.trim().toLowerCase()) {
            return true
          }
        }
        return false
      }

      );
    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }
  }

  //Funcion que revisa si la apiKey es de algún usuario de la base de datos que no es administrador y además es válida
  async apiKeyValidUser(api_key: string) {
    try {
      const user = await this.usuarioCollection.findOne({ api_key: api_key });
      if (user) return true;
      return false;
    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }

  }

  //Funcion que revisa si la apiKey es de algún usuario de la base de datos que ES administrador y además es válida
  async apiKeyValidAdmin(api_key: string) {
    try {
      const user = await this.usuarioCollection.findOne({ api_key: api_key, administrator: true });
      if (user) return true;
      return false;
    } catch (e) {
      throw new InternalServerErrorException(`An error has ocurred, contact the creator. DETAILS: ${e}`)
    }
  }
}



