import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// 添加控制器级别的权限验证
// 使用的时候需要在控制器上添加UseGuards
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request); // 获取请求数据，根据数据此处实现逻辑判断

    // 返回验证结果，bool值
    return true;
  }
}
