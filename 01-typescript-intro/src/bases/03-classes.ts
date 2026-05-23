import axios from 'axios';
import type { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interface';

// Declaración de la clase de forma tradicional
// export class Pokemon {

//     public id: number;
//     public name: string;

//     constructor(id: number, name: string) {
//         console.log('Constructor llamado');
//         this.id = id;
//         this.name = name;
//     }
// }

export class Pokemon {

    // Getter
    get imageUrl(): string {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.id}.svg`;
    }

    // Declaración rápida de atributos en el propio constructor
    constructor(
        public readonly id: number, // readonly no permite la edición de la propiedad
        public name: string,
        // public imageUrl: string
    ) {
        // console.log('Constructor llamado');
    }

    // Métodos(sin modificador por defecto acceso public)
    scream() {
        this.speak(); // llamada al método privado permitido desde dentro de la clase
        console.log(`${this.name.toUpperCase()}!!!`);
    }

    private speak() {
        console.log(`${this.name}, ${this.name}, ...`);
    }

    // Método asíncrono con promesas, tipamos el valor de retorno con Promise<Move[]>
    async getMoves(): Promise<Move[]> {

        const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/squirtle');
        console.log(data.moves.length);
        return data.moves;
    }

}

export const squirtle = new Pokemon(7, 'Squirtle');

// squirtle.scream();
// squirtle.speak(); // método privado, no permite acceder desde fuera de la clase

// squirtle.getMoves();