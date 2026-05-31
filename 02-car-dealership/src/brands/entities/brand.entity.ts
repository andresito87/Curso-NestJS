// Entities son las representaciones de los datos que viven dentro de la DB, es decir son como las tablas de la DB
export class Brand {
  id!: string;
  name!: string;
  createdAt!: number;
  updatedAt?: number;
}
