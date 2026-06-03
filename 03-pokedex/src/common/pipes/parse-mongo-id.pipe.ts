import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

// Custom Pipe que sirve para transformar la data que recibe el controlador al momento de entrar por los parámetros
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a valid MongoID`);
    }
    return value;
  }
}
