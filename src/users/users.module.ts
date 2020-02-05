import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { usersProviders } from './users.providers';
import { UploadModule } from 'src/upload/upload.module';
import { AuthService } from 'src/auth/auth.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  providers: [UsersService, UsersResolver, ...usersProviders, AuthService],
  exports: [UsersService, ...usersProviders],
  imports: [UploadModule, LoggerModule.forRoot()]
})
export class UsersModule {}
