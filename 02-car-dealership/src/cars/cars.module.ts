import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

// Los módulos son el agrupador de cada feature o funcionalidad de la api
@Module({
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
