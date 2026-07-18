import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // los endpoints contienen el prefijo api y el versionado: http:localhost:3000/api/v2/....
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // Transforma implícitamente los tipos de datos recibidos en queryparams de las peticiones
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`App running on port ${process.env.PORT ?? 3000}`);
}

bootstrap().catch((error) => {
  logger.error(error);
  process.exit(1);
});
