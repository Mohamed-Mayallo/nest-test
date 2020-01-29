import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { Users } from './users/users.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Auth {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService
  ) {}

  private getToken(req): string {
    if (req && req.headers.get('authorization'))
      return req.headers.get('authorization').split(' ')[1];
    return null;
  }

  async getCurrentUser(req): Promise<Users> {
    let token = this.getToken(req);
    if (!token) return null;
    let { id } = await jwt.verify(token, this.configService.get('JWT_SECRET'));
    let user = await this.userService.userById(id);
    return user || null;
  }
}
