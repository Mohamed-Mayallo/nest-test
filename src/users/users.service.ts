import { Injectable, Inject } from '@nestjs/common';
import { Users } from './users.entity';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly repo: typeof Users
  ) {}

  async user(id: string): Promise<Users> {
    return await this.repo.findOne({ where: { id } });
  }

  async users(): Promise<Array<Users>> {
    return await this.repo.findAll();
  }

  async createUser(input: CreateUserDto): Promise<Users> {
    return await this.repo.create(input);
  }
}
