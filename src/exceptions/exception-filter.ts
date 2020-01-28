import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

export interface IGqlErrorResponse<T> {
  code: number;
  success: boolean;
  message: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);
    return {
      code: exception.getStatus(),
      success: false,
      message: exception.getResponse()
    };
  }
}
