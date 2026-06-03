import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

// Declaramos que esta clase será un documento en MongoDB
@Schema()
export class Pokemon {
  // MongoDB ya provee el _id automáticamente

  @Prop({
    type: Number,
    unique: true,
    index: true,
    required: true,
  })
  no!: number;

  @Prop({
    type: String,
    unique: true,
    index: true,
    required: true,
    trim: true,
    lowercase: true,
  })
  name!: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
