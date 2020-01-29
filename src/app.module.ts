import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { DatabasesModule } from './databases/databases.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GqlConfigService } from './graphql.provider';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  providers: [],
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
    AuthModule
  ]
})
export class AppModule {}
