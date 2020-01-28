import { HttpException } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  private static lang: string = 'en';
  private static statusCode: number = 600;
  private static errorResponse = { 600: { en: 'Forbidden', ar: 'ممنوع' } };

  constructor(lang: string, statusCode: number) {
    super(
      BaseHttpException.getLocalizedMessage(),
      BaseHttpException.statusCode
    );
    BaseHttpException.lang = lang;
    BaseHttpException.statusCode = statusCode;
  }

  private static getLocalizedMessage() {
    return BaseHttpException.errorResponse[BaseHttpException.statusCode][
      BaseHttpException.lang
    ];
  }
}
