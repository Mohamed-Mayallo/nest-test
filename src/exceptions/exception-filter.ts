import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { LoggerService } from 'src/my-logger/logger.service';

export interface IGqlErrorResponse {
  code: number;
  success: boolean;
  message: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  logger;
  constructor() {
    this.logger = new LoggerService();
  }

  catch(exception: HttpException, host: ArgumentsHost): IGqlErrorResponse {
    GqlArgumentsHost.create(host);
    let message = <any>exception.getResponse();
    if (typeof message === 'object') {
      this.logger.error(message.error, message.message);
      message = `${message.error} - ${JSON.stringify(message.message)}`;
    } else this.logger.error(message);
    return {
      code: exception.getStatus(),
      success: false,
      message
    };
  }
}
