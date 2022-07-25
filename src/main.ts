import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ComputerModule } from './computer/computer.module';

async function bootstrap() {
  const app = await NestFactory.create(ComputerModule);

  // Add a global pipes validator to validate every single incoming requests
  // If no validation rules exist, it won't try to validate requests
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000);
}

bootstrap();
