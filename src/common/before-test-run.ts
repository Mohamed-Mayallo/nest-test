import { Test } from '@nestjs/testing';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { GqlResponseInterceptor } from 'src/graphql/gql-response.type';
import { Sequelize } from 'sequelize-typescript';
import { AppModule } from 'src/app.module';
import { LoggerService } from 'src/logger/logger.service';

export let app: INestApplication;

// Run before all tests
beforeAll(async () => {
  // Maximize test timeout
  jest.setTimeout(100000);

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();
  app = moduleRef.createNestApplication();
  app.useLogger(new LoggerService());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new GqlResponseInterceptor());
  await app.init();
});

// Run before each test
beforeEach(async () => {
  const sequelizeProvider = <Sequelize>app.get('SEQUELIZE', { strict: false });
  await sequelizeProvider.sync();
});

// Run after each test
afterEach(async () => {
  const sequelizeProvider = <Sequelize>app.get('SEQUELIZE', { strict: false });
  await sequelizeProvider.drop();
});

// Run after all tests
afterAll(async () => {
  await app.close();
});
