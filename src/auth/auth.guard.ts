import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { BaseHttpException } from 'src/exceptions/base-http-exception';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const ctx = GqlExecutionContext.create(context);
    const { currentUser } = ctx.getContext();
    if (!currentUser) throw new BaseHttpException('en', 602);
    if (roles && !this.authService.hasRole(roles, currentUser))
      throw new BaseHttpException('en', 602);
    return true;
  }
}
