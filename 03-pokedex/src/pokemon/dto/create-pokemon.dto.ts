import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePokemonDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  no!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
