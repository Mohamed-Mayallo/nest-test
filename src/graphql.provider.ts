import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { AuthService } from './auth/auth.service';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly authService: AuthService) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      playground: true,
      introspection: true,
      debug: true,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: async ({ req }) => ({
        req,
        currentUser: await this.authService.getCurrentUser(req)
      }),
      uploads: {
        maxFileSize: 4 * 1024 * 1024, // Max file size: 4 MG
        maxFiles: 5
      }
    };
  }
}
