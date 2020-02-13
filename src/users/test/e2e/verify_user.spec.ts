import * as request from 'supertest';
import { VERIFY_USER } from '../graphql/mutation';
import { app } from 'src/before-test';
import { UserFactory } from 'src/databases/factories/users';

describe('Users end to end test', () => {
  it('only_admins_can_verify_user', async () => {
    const notVerifiedUser = await UserFactory({ isVerified: false });
    const admin = await UserFactory({ role: 'admin' });
    const notAdmin = await UserFactory();

    let res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${notAdmin.token}`)
      .send({
        query: VERIFY_USER,
        variables: {
          id: notVerifiedUser.id
        }
      });

    expect(res.body.data.response.code).toBe(602);
  }, 10000);
});
