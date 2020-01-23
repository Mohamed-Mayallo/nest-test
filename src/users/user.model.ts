import { ID, Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  avgRate?: number;
}
