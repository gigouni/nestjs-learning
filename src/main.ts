import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators
  // Example: if we add an unexpected property in the POST body, it will be automatically removed from the body
  // Source: https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(4000);
}
bootstrap();
