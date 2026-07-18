import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Pokemon, PokemonDocument } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name) // NestJS y su implementación en mongoose permite inyectar el modelo en el servicio
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService, // Me permite acceder a las variables de entorno
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit') ?? 5;
  }

  async create(
    createPokemonDto: CreatePokemonDto,
  ): Promise<PokemonDocument | null> {
    const pokemonToCreate = {
      // no mutamos el objeto dto recibido
      ...createPokemonDto,
      name: createPokemonDto.name.toLowerCase().trim(), // Lo almacenamos en BD con todo en minúsculas
    };

    try {
      const pokemon = await this.pokemonModel.create(pokemonToCreate);
      return pokemon;
    } catch (error: unknown) {
      this.handleExceptions(error);
    }

    return null;
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return this.pokemonModel
      .find() // recupera resgistro de MongoDB
      .limit(limit) // Cantidad de registros que utiliza en la respuesta
      .skip(offset) // Indica la posición a partir de la cual utilizará como respuesta, descartando anteriores posiciones
      .sort({ no: 1 }) // Ordena la respuesta por el campo no de forma ascendente
      .select('-__v'); // Quita ese campo en la respuesta
  }

  async findOne(term: string) {
    let pokemon: PokemonDocument | null = null;

    // Comprobamos si el id es un número
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    // Buscamos por Mongo ID
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Buscamos por Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no ${term} not found`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term); // obtiene un modelo de mongoose

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto);
    } catch (error: unknown) {
      this.handleExceptions(error);
    }

    return { ...pokemon.toJSON(), ...updatePokemonDto }; // recoge los datos modificados y lo transforma a Json
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({
      _id: id,
    });

    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }

    return;
  }

  async removeAll() {
    await this.pokemonModel.deleteMany();
  }

  async createAll(createPokemonDto: CreatePokemonDto[]) {
    await this.pokemonModel.insertMany(createPokemonDto);
  }

  private handleExceptions(error: unknown) {
    if (error instanceof MongoServerError && error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in DB ${JSON.stringify(error.keyValue)}`,
      );
    }

    console.log(error);

    throw new InternalServerErrorException(
      "Can't create/update Pokemon - Check server logs",
    );
  }
}
