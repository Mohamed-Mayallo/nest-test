import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(lang: string) {
    super('Forbidden', 500);
  }
}
