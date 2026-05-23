import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: string) {
    // Los parámetros siempre vendrán como string pero en este caso necesitamos convertir a number el id
    return this.carsService.findOneById(+id);
  }

  @Post()
  createCar(@Body() body: string) {
    return body;
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: string, @Body() body: string) {
    return body;
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: string) {
    return {
      method: 'DELETE',
      id,
    };
  }
}
