import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validador global a nivel de aplicación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Busca la propiedades del DTO en la petición si alguna no existe, genera error
      forbidNonWhitelisted: true, // No permite porpiedades que no esten en el DTO y genera error en ese caso
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  logger.error(error);
  process.exit(1);
});
