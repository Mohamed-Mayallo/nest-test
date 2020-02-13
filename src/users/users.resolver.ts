import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Mutation
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { AuthMetadata } from '../auth/auth.metadata';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateUserDto, LoginDto, VerifyUserDto } from './users.dto';
import { CreateUserTransformer } from './users.pipe';
import { UsersResponse, UserResponse } from './gql.types';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Logger } from 'src/logger/logger.decorator';
import { LoggerService } from 'src/logger/logger.service';

@Resolver(of => Users)
export class UsersResolver {
  constructor(
    private readonly service: UsersService,
    @Logger('UsersResolver') private logger: LoggerService
  ) {}

  @Query(of => UsersResponse)
  @AuthMetadata('admin', 'hr', 'user')
  @UseGuards(AuthGuard)
  async users() {
    return await this.service.users();
  }

  @Mutation(of => UsersResponse)
  @AuthMetadata('admin')
  @UseGuards(AuthGuard)
  async verifyUser(@Args('id') id: string) {
    return await this.service.verifyUser(id);
  }

  @Query(of => UserResponse)
  async user(@Args('id') id: string, @CurrentUser('email') email) {
    return await this.service.userById(id);
  }

  @ResolveProperty()
  avgRate(): number {
    return 5;
  }

  @Mutation(of => UserResponse)
  async createUser(@Args('input', CreateUserTransformer) input: CreateUserDto) {
    return await this.service.createUser(input);
  }

  @Mutation(of => UserResponse)
  async login(@Args('input') input: LoginDto) {
    this.logger.verbose('Warning ..............');
    return await this.service.emailPasswordBasedAuth(
      input.email,
      input.password
    );
  }
}
