import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (fieldName, [root, args, ctx, info]) => {
    if (!ctx.currentUser) return false;
    if (fieldName) return ctx.currentUser[fieldName];
    return ctx.currentUser;
  }
);
