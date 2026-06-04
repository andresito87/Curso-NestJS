import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(private readonly httpService: HttpService) {}
  async executeSeed() {
    const {
      data: { results },
    } = await firstValueFrom(
      this.httpService.get<PokeResponse>('pokemon?limit=10').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException(
            `Error getting pokemons from PokeApi`,
          );
        }),
      ),
    );

    results.forEach(({ name, url }) => {
      const numberPokemon = Number(url.split('/').at(-2));
      console.log({ no: numberPokemon, name });
    });

    return results;
  }
}
