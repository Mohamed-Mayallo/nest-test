import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { Auth } from './auth.provider';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly auth: Auth) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      playground: true,
      introspection: true,
      debug: true,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: async ({ req }) => ({
        req,
        currentUser: await this.auth.getCurrentUser(req)
      }),
      uploads: {
        maxFileSize: 4 * 1024 * 1024, // Max file size: 4 MG
        maxFiles: 5
      }
    };
  }
}
