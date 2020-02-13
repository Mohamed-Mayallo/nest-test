import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as faker from 'faker';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Users } from 'src/users/users.entity';

const env = dotenv.parse(
  fs.readFileSync(path.join(__dirname, '../../../.env'))
);

export const UsersFactory = async (
  obj = <any>{},
  count: number
): Promise<Users[]> => {
  let users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      name: obj.name || faker.name.firstName(),
      email: obj.email || faker.internet.email(),
      password: bcrypt.hashSync('123456', 10),
      role: obj.role || 'user',
      avatar: faker.internet.avatar(),
      isVerified: obj.isVerified !== undefined ? obj.isVerified : true
    });
  }
  return await Users.bulkCreate(users);
};

export const UserFactory = async (obj = <any>{}): Promise<Users> => {
  const user = {
    name: obj.name || faker.name.firstName(),
    email: obj.email || faker.internet.email(),
    password: bcrypt.hashSync('123456', 10),
    role: obj.role || 'user',
    avatar: faker.internet.avatar(),
    isVerified: obj.isVerified !== undefined ? obj.isVerified : true
  };
  const newUser = await Users.create(user);
  return Object.assign(newUser, {
    token: jwt.sign({ id: newUser.id }, env.JWT_SECRET)
  });
};
