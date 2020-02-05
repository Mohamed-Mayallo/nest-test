import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GqlResponseInterceptor } from './shared/gql-response.type';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService()
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new GqlResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
