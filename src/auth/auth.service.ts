import { Injectable, Scope } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService
  ) {}

  private getToken(req): string {
    if (req && req.headers.authorization)
      return req.headers.authorization.split(' ')[1];
    return null;
  }

  async getCurrentUser(req): Promise<Users> {
    let token = this.getToken(req);
    if (!token) return null;
    let { id } = await jwt.verify(token, this.configService.get('JWT_SECRET'));
    return await this.userService.userById(id);
  }

  hasRole(roles: string[], user: Users): boolean {
    return roles.includes(user.role);
  }
}
