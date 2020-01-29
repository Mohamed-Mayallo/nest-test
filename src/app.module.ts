import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { DatabasesModule } from './databases/databases.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GqlConfigService } from './graphql.provider';
import { Auth } from './auth.provider';
import { UsersService } from './users/users.service';

@Module({
  providers: [],
  exports: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ rootPath: 'public' }),
    GraphQLModule.forRootAsync({
      // imports: [Auth],
      useExisting: GqlConfigService,
      inject: [Auth]
    }),
    // GraphQLModule.forRoot({
    //   playground: true,
    //   debug: true,
    //   autoSchemaFile: 'schema.gql',
    //   installSubscriptionHandlers: true,
    //   context: ({ req }) => ({ req }),
    //   uploads: {
    //     maxFileSize: 4 * 1024 * 1024, // Max file size: 4 MG
    //     maxFiles: 5
    //   }
    // }),
    DatabasesModule,
    UploadModule,
    UsersModule
  ]
})
export class AppModule {}
