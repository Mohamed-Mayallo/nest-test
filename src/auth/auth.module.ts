import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UploadService } from 'src/upload/upload.service';

@Module({
  providers: [UsersService, ConfigService, AuthService, UploadService],
  imports: [UsersModule, ConfigModule],
  exports: [AuthService]
})
export class AuthModule {}
