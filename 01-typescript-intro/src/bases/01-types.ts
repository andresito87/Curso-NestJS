export let name: string = 'Andres';
export const age: number = 38;
export const isValid: boolean = true;

name = 'Ana';

export const templateSting = ` Esto es un string
multilinea
que puede tener
" dobles
' simple
inyectar valores ${name}
expresiones: ${1 + 1}
números: ${age}
booleanos: ${isValid}`;

// console.log(templateSting);