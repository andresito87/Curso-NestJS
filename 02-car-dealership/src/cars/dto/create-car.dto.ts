import { IsString } from 'class-validator';

export class CreateCarDto {
  @IsString() // Estos decoradores aplican las validaciones a través de los Pipes como validadores
  readonly brand!: string;

  @IsString() // Estos decoradores aplican las validaciones a través de los Pipes como validadores
  // @MinLength(3) // Se podría aplicar una validación para una cantida mínima de caracteres
  readonly model!: string;
}
