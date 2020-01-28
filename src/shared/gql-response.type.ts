import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IGqlSuccessResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class GqlResponseInterceptor<T>
  implements NestInterceptor<T, IGqlSuccessResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<IGqlSuccessResponse<T>> {
    const now = Date.now();
    return next.handle().pipe(
      map(res => {
        console.log('*******************************');
        console.log(
          `${context.getHandler().name} operation takes ${Date.now() -
            now}ms at ${context.getClass().name} class`
        );
        console.log('*******************************');
        return {
          code: 200,
          success: true,
          message: 'Operation done successfully',
          data: res
        };
      })
    );
  }
}
