import { InputType, Field } from 'type-graphql';
import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { Upload } from '../upload/upload.type';
import { UploadScalar } from 'src/upload/upload.scalar';
import { Exclude } from 'class-transformer';

@InputType()
export class CreateUserDto {
  @Field()
  readonly name: string;

  @Field()
  @MinLength(6)
  @MaxLength(30)
  readonly password: string;

  @Field()
  @IsEmail()
  readonly email: string;

  @Field(type => UploadScalar, { nullable: true })
  @Exclude() // class-transformer generates an error with the promised file
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
