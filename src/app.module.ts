import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { DatabasesModule } from './databases/databases.module';

@Module({
  providers: [],
  exports: [],
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true
    }),
    DatabasesModule,
    UsersModule
  ]
})
export class AppModule {}
