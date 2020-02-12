import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { DatabasesModule } from './databases/databases.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GqlConfigService } from './graphql.provider';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { LoggerModule } from './logger/logger.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/exception-filter';
import { ScheduleModule } from '@nestjs/schedule';
import { AutoDbBackupService } from './shared/auto-db-backup.service';

const env = dotenv.parse(fs.readFileSync(path.join(__dirname, '../.env')));

@Module({
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    ...(env.NODE_ENV === 'production' ? [AutoDbBackupService] : [])
  ],
  exports: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ rootPath: 'public' }),
    GraphQLModule.forRootAsync({
      imports: [AuthModule],
      useClass: GqlConfigService,
      inject: [AuthService]
    }),
    DatabasesModule,
    UploadModule,
    UsersModule,
    AuthModule,
    LoggerModule.forRoot(),
    ScheduleModule.forRoot()
  ]
})
export class AppModule {}
