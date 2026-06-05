import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
// import { AxiosAdapter } from '../common/adapters/axios.adpater';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private readonly httpService: HttpService,
    // private readonly http: AxiosAdapter, // Nuestro Custom Provider injectable que utiliza axios
    private readonly pokemonService: PokemonService,
  ) {}
  async executeSeed() {
    await this.pokemonService.removeAll();

    // Usamos nuestro Custom Provider para recuperar los pokemons
    // const data = await this.http.get<PokeResponse>('pokemon?limit=650');

    // Usamos el wrapper de NestJS para hacer peticiones que por debajo usa axios
    // https://docs.nestjs.com/techniques/http-module#http-module
    const {
      data: { results },
    } = await firstValueFrom(
      this.httpService.get<PokeResponse>('pokemon?limit=650').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException(
            `Error getting pokemons from PokeApi`,
          );
        }),
      ),
    );

    const pokemonToInsert: CreatePokemonDto[] = [];

    for (const { name, url } of results) {
      const numberPokemon = Number(url.split('/').at(-2));
      console.log({ no: numberPokemon, name });
      pokemonToInsert.push({ no: numberPokemon, name });
    }

    await this.pokemonService.createAll(pokemonToInsert);

    return 'Seed executed !!!';
  }
}
