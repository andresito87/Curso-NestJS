
// Decorador que permite lanzar un aviso cuando se utiliza un método de la clase que está decorado con él
const Deprecated = (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
        // console.log({target})
        return {
            get() {
                const wrapperFn = (...args: any[]) => {
                    // Se muestra este warning en la consola si usamos el método de la clase que esté decorado con Deprecated
                    console.warn(`Method ${memberName} is deprecated with reason: ${deprecationReason}`);
                    propertyDescriptor.value.apply(this, args); // Llamar al método propiamente de la clase con sus argumentos
                };
                return wrapperFn;
            }
        };
    };
};

export class Pokemon {

    constructor(
        public readonly id: number,
        public name: string,
    ) { }

    scream() {
        console.log(`${this.name.toUpperCase()}!!!`);
    }

    @Deprecated('Must use speak2 method instead')
    speak() {
        console.log(`${this.name}, ${this.name}, ...`);
    }

    speak2() {
        console.log(`${this.name}, ${this.name}, !!!!`);
    }

}

export const squirtle = new Pokemon(7, 'Squirtle');

squirtle.speak();