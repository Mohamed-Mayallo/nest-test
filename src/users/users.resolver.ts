import { Resolver, Query, Args, ResolveProperty } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.model';
import { Roles } from '../roles.decorator';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Query(of => [User])
  @Roles('admin')
  async users() {
    return await this.service.users();
  }

  @Query(of => User)
  async user(@Args('id') id: number) {
    return await this.service.user(id);
  }

  @ResolveProperty()
  avgRate(): number {
    return 2;
  }
}
