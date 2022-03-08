import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/*
{
  "success": true,
  "data": {},
  "errorCode": "1001",
  "errorMessage": "error message",
  "showType": 2,
  "traceId": "someid",
  "host": "10.1.1.1"
}
*/

@Injectable()
export class AllResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        if (data?.errorMessage) {
          return data;
        } else {
          return {
            data,
            success: true,
            errorMessage: '',
          };
        }
      }),
    );
  }
}
