import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class ValidateLoginMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(req: any, res: any, next: () => void) {
    // 暂时注释验证部分代码
    // console.log('验证登录');
    // next();
    if (req.cookies?.token) {
      // console.log(req.cookies.token);
      let user = null;
      if (req.originalUrl.startsWith('/admin')) {
        user = await this.prisma.manager.findUnique({
          where: { id: req.cookies.token },
        });
      } else {
        user = await this.prisma.user.findUnique({
          where: { id: req.cookies.token },
        });
      }

      if (user) {
        req.user = user;
        next();
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
