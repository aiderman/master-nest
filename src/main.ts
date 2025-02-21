import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Pastikan path ini benar
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3200);
}
bootstrap();