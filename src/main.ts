import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());


  const config = app.get(ConfigService);
  app.enableCors({origin: config.get('CORS_ORIGIN')});
  await app.listen(3000);
}
bootstrap();
