import { join } from 'path'; // proviene de Node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // Esta configuración sirve para servir contenido estático con la api desde el directorio public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PokemonModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // conexión a MongoDB para NestJS, la url de conexión esta en variables de entorno
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI');

        if (!mongoUri) {
          throw new Error('MONGODB_URI is not defined in .env');
        }

        return {
          uri: mongoUri,
        };
      },
    }),
    CommonModule,
  ],
})
export class AppModule {}
