import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { usersProviders } from './users.providers';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  providers: [UsersService, UsersResolver, ...usersProviders],
  exports: [UsersService, ...usersProviders],
  imports: [UploadModule]
})
export class UsersModule {}
