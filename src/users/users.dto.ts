import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserDto {
  @Field()
  readonly name: string;
}
