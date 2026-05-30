import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

// Los servicios son los encargados del manejo de los datos tanto internos como externos
@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuidv4(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuidv4(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuidv4(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with id '${id}' not found`);
    }

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuidv4(),
      ...createCarDto, // lo hace de una vez enviando todas propiedades del objeto recibido
      // brand: createCarDto.brand,
      // model: createCarDto.model,
    };

    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    const carToUpdate = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException(`Car id ${id} is not valid`);
    }

    const updatedCar = {
      ...carToUpdate,
      brand: updateCarDto.brand ?? carToUpdate.brand, // Evita que propiedades undefined pisen el valor anterior de la propiedad
      model: updateCarDto.model ?? carToUpdate.model,
      id,
    };

    this.cars = this.cars.map((car) => (car.id === id ? updatedCar : car));

    return updatedCar;
  }

  delete(id: string) {
    const carToDelete = this.findOneById(id);

    this.cars = this.cars.filter((car) => car.id !== id);

    return carToDelete;
  }
}
