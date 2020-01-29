import { SetMetadata } from '@nestjs/common';

export const AuthMetadata = (...args: string[]) => SetMetadata('roles', args);
