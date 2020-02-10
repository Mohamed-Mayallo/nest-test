import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { GqlResponseInterceptor } from 'src/shared/gql-response.type';
import { LoggerService } from 'src/logger/logger.service';
import { AppModule } from 'src/app.module';

describe('Users end to end test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useLogger(new LoggerService());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new GqlResponseInterceptor());
    await app.init();
  });

  it('login_have_to_return_user_token', async () => {
    let res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation createUser ($input: CreateUserDto!) {
            response: createUser (input: $input) {
              code
              success
              message
              data {
                id
                name
                email
                avgRate
              }
            }
          }
        `,
        variables: {
          input: {
            name: 'Ahmed',
            email: 'a@a.com',
            password: '123456'
          }
        }
      });

    expect(res.body.data.response.code).toBe(200);
    expect(res.body.data.response.data.email).toBe('a@a.com');
    expect(res.body.data.response.data.name).toBe('Ahmed');
  });

  afterAll(async () => {
    await app.close();
  });
});
