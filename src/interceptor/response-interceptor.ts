import { NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//接口响应数据
export interface SuccessResponse<T> {
  status: HttpStatus;
  message: string;
  data: T;
  success: boolean;
}

// nestjs 响应拦截器
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: HttpStatus.OK,
          message: '操作成功！',
          data,
          success: true,
        };
      }),
    );
  }
}
