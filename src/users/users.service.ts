import { Injectable, Inject } from '@nestjs/common';
import { Users } from './users.entity';
import { CreateUserDto, VerifyUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UploadService } from 'src/upload/upload.service';
import { BaseHttpException } from 'src/exceptions/base-http-exception';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly repo: typeof Users,
    private readonly configService: ConfigService,
    private readonly uploader: UploadService
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
      throw new BaseHttpException('en', 601);
    return Object.assign(user, {
      token: jwt.sign({ id: user.id }, this.configService.get('JWT_SECRET'))
    });
  }

  async users(): Promise<Array<Users>> {
    return await this.repo.findAll();
  }

  async createUser(input: CreateUserDto): Promise<Users> {
    return await this.repo.create(
      Object.assign(input, {
        ...(input.avatar &&
          typeof input.avatar === 'object' && {
            avatar: await this.uploader.graphqlUpload(input.avatar, 'users')
          })
      })
    );
  }

  async verifyUser(id: string): Promise<Users> {
    const user = await this.repo.update(
      { isVerified: true },
      {
        where: { id },
        returning: true
      }
    );
    console.log(user, 'wwwwwwwwww');
    return user[1][0];
  }
}
