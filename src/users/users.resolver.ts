import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Mutation
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../roles.guard';
import { UseGuards } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './users.dto';
import { CreateUserTransformer } from './users.pipe';

@Resolver(of => Users)
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Query(of => [Users])
  @Roles('admin')
  @UseGuards(RolesGuard)
  async users() {
    return await this.service.users();
  }

  @Query(of => Users)
  async user(@Args('id') id: string) {
    return await this.service.userById(id);
  }

  @ResolveProperty()
  avgRate(): number {
    return 5;
  }

  @Mutation(of => Users)
  async createUser(@Args('input', CreateUserTransformer) input: CreateUserDto) {
    return await this.service.createUser(input);
  }

  @Mutation(of => Users)
  login(@Args('input') input: LoginDto) {
    return this.service.emailPasswordBasedAuth(input.email, input.password);
  }
}
