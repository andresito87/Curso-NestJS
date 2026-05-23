import './style.css';
import typescriptLogo from './assets/typescript.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
// import { name } from './bases/01-types.ts';
// import { pokemonIds, bulbasur, pokemons } from './bases/02-objects.ts';
import { squirtle as squirtleWithImage } from './bases/03-classes.ts';
// import { squirtle } from './bases/05-decorators.ts';
import { squirtle } from './bases/06-decorators.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Curso de NestJS</h1>
    <h2>TypeScript</h2>
    <p>Pokemon: ${squirtle.name}</p>
    <img src=${squirtleWithImage.imageUrl} alt="imagen de pokemon" />
  </div>
</section>
`;
