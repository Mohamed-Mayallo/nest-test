import * as request from 'supertest';
import { CREATE_USER } from '../graphql/mutation';
import { app } from 'src/common/before-test-run';

describe('Users end to end test', () => {
  it('create_user', async () => {
    let res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: CREATE_USER,
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
});
