import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Users } from './users.entity';
import { CreateUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly repo: typeof Users,
    private readonly configService: ConfigService
  ) {}

  async userById(id: string): Promise<Users> {
    return await this.repo.findOne({ where: { id } });
  }

  async emailPasswordBasedAuth(
    email: string,
    password: string
  ): Promise<Users | void> {
    let user = await this.repo.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException();
    return Object.assign(user, {
      token: jwt.sign({ id: user.id }, this.configService.get('JWT_SECRET'))
    });
  }

  async users(): Promise<Array<Users>> {
    return await this.repo.findAll();
  }

  async createUser(input: CreateUserDto): Promise<Users> {
    console.log(input, '>>>>>>>>>>>>>>>>>>>>>>ff');
    return await this.repo.create(input);
  }
}
