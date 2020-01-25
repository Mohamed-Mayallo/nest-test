import { InputType, Field } from 'type-graphql';
import { IsEmail, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  readonly name: string;

  @Field()
  readonly password: string;

  @Field()
  readonly email: string;
}

@InputType()
export class LoginDto {
  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  @MinLength(6)
  @MaxLength(30)
  readonly password: string;
}
