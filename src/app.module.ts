import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { DatabasesModule } from './databases/databases.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  providers: [],
  exports: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ rootPath: 'public' }),
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
      uploads: {
        maxFileSize: 4 * 1024 * 1024, // Max file size: 4 MG
        maxFiles: 5
      }
    }),
    DatabasesModule,
    UploadModule,
    UsersModule
  ]
})
export class AppModule {}
