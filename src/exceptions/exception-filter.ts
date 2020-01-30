import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

export interface IGqlErrorResponse {
  code: number;
  success: boolean;
  message: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): IGqlErrorResponse {
    GqlArgumentsHost.create(host);
    let message = <any>exception.getResponse();
    if (typeof message === 'object')
      message = `${message.error} - ${JSON.stringify(message.message)}`;
    return {
      code: exception.getStatus(),
      success: false,
      message
    };
  }
}
