import { InputType, Field } from 'type-graphql';
import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { Upload } from '../upload.type';
import { UploadScalar } from 'src/upload.scalar';

@InputType()
export class CreateUserDto {
  @Field()
  readonly name: string;

  @Field()
  readonly password: string;

  @Field()
  readonly email: string;

  @Field(type => UploadScalar, { nullable: true })
  readonly avatar?: Upload;
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
