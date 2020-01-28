import { Field, ObjectType } from 'type-graphql';
import { Users } from './users.entity';

@ObjectType()
export class UsersResponse {
  @Field()
  code: number;

  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(type => [Users], { nullable: 'itemsAndList' })
  data?: Users[];
}
