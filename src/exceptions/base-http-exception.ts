import { HttpException, Injectable, Scope } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  private static lang: string = 'en';
  private static statusCode: number = 600;
  private static errorResponse = {
    600: { en: 'Forbidden', ar: 'ممنوع' },
    601: { en: 'Invalid credentials', ar: 'خطأ فى البيانات' },
    602: { en: 'Unauthorized', ar: 'غير مصرح' }
  };

  constructor(lang: string, statusCode: number) {
    BaseHttpException.lang = lang;
    BaseHttpException.statusCode = statusCode;
    super(
      BaseHttpException.getLocalizedMessage(),
      BaseHttpException.statusCode
    );
  }

  private static getLocalizedMessage() {
    return BaseHttpException.errorResponse[BaseHttpException.statusCode][
      BaseHttpException.lang
    ];
  }
}
