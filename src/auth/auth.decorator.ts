import { createParamDecorator } from '@nestjs/common';

export const IsAuthorized = createParamDecorator(
  (roles, [root, args, ctx, info]) => {
    if (!ctx.currentUser) return false;
    if (Array.isArray(roles)) return roles.includes(ctx.currentUser.role);
    if (typeof roles === 'string') ctx.currentUser.role === roles;
    return false;
  }
);
