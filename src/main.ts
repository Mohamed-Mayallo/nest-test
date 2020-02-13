import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GqlResponseInterceptor } from './graphql/gql-response.type';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
    cors: false
  });
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // Limit each IP to 100 requests per windowMs
    })
  );
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new GqlResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
