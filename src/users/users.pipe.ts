import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CreateUserTransformer implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata): CreateUserDto {
    let res = Object.assign(value, {
      password: bcrypt.hashSync(value.password, 10)
    });
    return res;
  }
}
