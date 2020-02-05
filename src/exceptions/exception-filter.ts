import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { LoggerService } from 'src/logger/logger.service';

export interface IGqlErrorResponse {
  code: number;
  success: boolean;
  message: string;
}

@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  private response = {
    code: 500,
    success: false,
    message: 'Some thing went wrong!'
  };

  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): IGqlErrorResponse {
    if (exception instanceof HttpException) {
      let gqlHost = GqlArgumentsHost.create(host);
      let currentGqlInfo = gqlHost.getInfo();
      let currentGqlCtx = gqlHost.getContext();
      this.logger.setPrefix(currentGqlInfo.fieldName);
      let message = <any>exception.getResponse();
      let trace = `Operation body: ${JSON.stringify(currentGqlCtx.req.body)}
        Current user: ${
          currentGqlCtx.currentUser ? currentGqlCtx.currentUser.id : 'No user'
        }`;
      if (typeof message === 'object') {
        this.logger.error(message.error, trace);
        message = `${message.error} - ${JSON.stringify(message.message)}`;
      } else this.logger.error(message, trace);
      this.response.code = exception.getStatus();
      this.response.message = message;
      return this.response;
    }

    if (exception instanceof Error) {
      this.response.message = JSON.stringify(exception.stack);
      return this.response;
    }
  }
}
