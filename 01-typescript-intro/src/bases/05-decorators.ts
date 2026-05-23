
// Nueva clase Pokemon
class NewPokemon {
    constructor(
        public readonly id: number,
        public name: string,
    ) { }

    scream() {
        console.log('¡¡¡ NO QUIERO !!!');
    }

    speak() {
        console.log('¡ NO QUIERO HABLAR !');
    }
}

// Declaración de un decorador, el decorador tiene acceso a la definición de la clase
const MyDecorator = () => {
    return (target: Function) => { // el target en este caso es la definición de la clase
        console.log(target); // Muestra la clase en consola
        return NewPokemon; // Regresa la definición de una clase diferente a la clase sobre la que se aplica el decorador, la sobreescribe
    };
};

// Para utilizar decoradores hay que habilitar la opción "experimentalDecorators": true en el tsconfig
// limpiar la caché de Vite para que todo se configure correctamente con rm -rf node_modules/.vite y npm run dev -- --force
@MyDecorator()
export class Pokemon {

    constructor(
        public readonly id: number,
        public name: string,
    ) { }

    scream() {
        console.log(`${this.name.toUpperCase()}!!!`);
    }

    speak() {
        console.log(`${this.name}, ${this.name}, ... !`);
    }

}

export const squirtle = new Pokemon(7, 'Squirtle');

squirtle.scream();
squirtle.speak();

