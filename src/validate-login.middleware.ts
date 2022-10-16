import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { validateToken } from './utils/tools';

@Injectable()
export class ValidateLoginMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(req: any, res: any, next: () => void) {
    // 暂时注释验证部分代码
    // console.log('验证登录');
    // next();
    // console.log(req.cookies?.token);
    if (req.cookies?.token) {
      // console.log(req.cookies.token);
      let user = null;
      validateToken(req.cookies.token, async (validateResult) => {
        if (validateResult.code) {
          const userId = validateResult.data.id;
          if (req.originalUrl.startsWith('/admin')) {
            user = await this.prisma.manager.findUnique({
              where: { id: userId },
            });
          } else {
            user = await this.prisma.user.findUnique({
              where: { id: userId },
            });
          }
          // console.log(user);
          if (user) {
            req.user = user;
            next();
          } else {
            throw new UnauthorizedException();
          }
        } else {
          throw new UnauthorizedException();
        }
      });
    } else {
      throw new UnauthorizedException();
    }
  }
}
