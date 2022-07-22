import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);

  // Add a global pipes validator to validate every single incoming requests
  // If no validation rules exist, it won't try to validate requests
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000);
}

bootstrap();
