

export const pokemonIds = [1, 23, 32, 12, 4, 78];

// pokemonIds.push(+'1'); // + hace una conversión rápida a número, similar a Number()

interface Pokemon {
    id: number,
    name: string;
    age?: number; // opcional, puede venir o no
}

export const bulbasur: Pokemon = {
    id: 1,
    name: 'Bulbasur'
};

export const charmander: Pokemon = {
    id: 4,
    name: 'Charmander',
    age: 2
};

export const pokemons: Pokemon[] = [];
pokemons.push(bulbasur, charmander);