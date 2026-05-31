import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuidv4(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    // },
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuidv4(),
      name: createBrandDto.name,
      createdAt: new Date().getTime(),
    };

    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (!brand) {
      throw new NotFoundException(`Brand with id '${id}' not found`);
    }

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    // 1. Buscamos el índice. Si no existe, lanzamos el NotFoundException.
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand with id '${id}' not found`);
    }

    // 2. Creamos la versión actualizada combinando los datos y seteando el updatedAt
    const updatedBrand = {
      ...this.brands[index],
      ...updateBrandDto,
      updatedAt: new Date().getTime(),
    };

    // 3. Reemplazamos únicamente el elemento en esa posición
    this.brands[index] = updatedBrand;

    // 4. Retornamos el objeto actualizado (clave para que el controlador lo responda)
    return updatedBrand;
  }

  remove(id: string) {
    // 1. Buscamos el índice. Si no existe, lanzamos el NotFoundException.
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand with id '${id}' not found`);
    }

    // 2. Eliminamos el elemento en esa posición
    this.brands.splice(index, 1);
  }

  fillCarsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
