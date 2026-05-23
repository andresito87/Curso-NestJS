import { PokeApiAxiosAdapter, PokeApiFetchAdapter, type HttpAdapter } from '../api/pokeApi.adapter';
import type { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interface';

export class Pokemon {

    get imageUrl(): string {
        return `https://pokemon.com/${this.id}.jpg`;
    }

    constructor(
        public readonly id: number,
        public name: string,
        // inyección de dependencias
        private readonly http: HttpAdapter
    ) { }

    scream() {
        console.log(`${this.name.toUpperCase()}!!!`);
    }

    speak() {
        console.log(`${this.name}, ${this.name}`);
    }

    async getMoves(): Promise<Move[]> {
        const data = await this.http.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/7');
        console.log(data.moves);

        return data.moves;
    }

}

const pokeApiAxios = new PokeApiAxiosAdapter();
const pokeApiFetch = new PokeApiFetchAdapter();

export const squirtle = new Pokemon(7, 'Squirtle', pokeApiAxios);
export const squirtle2 = new Pokemon(7, 'Squirtle', pokeApiFetch);

squirtle.getMoves();