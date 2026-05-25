import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDto {
  @IsString() // Estos decoradores aplican las validaciones a través de los Pipes como validadores
  @IsUUID() // Estos decoradores aplican las validaciones a través de los Pipes como validadores
  @IsOptional() // Estos decoradores aplican las validaciones a través de los Pipes como validadores
  readonly id?: string;

  @IsString() // Estos decoradores aplican las validaciones a través de los Pipes como validadores
  @IsOptional() // Estos decoradores aplican las validaciones a través de los Pipes como validadores
  readonly brand?: string;

  @IsString() // Estos decoradores aplican las validaciones a través de los Pipes como validadores
  @IsOptional() // Estos decoradores aplican las validaciones a través de los Pipes como validadores
  readonly model?: string;
}
