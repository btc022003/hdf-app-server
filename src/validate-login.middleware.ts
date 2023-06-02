import {
  Injectable,
  NestMiddleware,
  // UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { validateToken } from './utils/tools';

@Injectable()
export class ValidateLoginMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  resUnAuthorized(res) {
    return res.status(401).json({
      success: false,
      errorMessage: '请先登录',
      data: {},
      statusCode: 401,
    });
  }

  async use(req: any, res: any, next: () => void) {
    // 暂时注释验证部分代码
    // console.log('验证登录');
    // next();
    // console.log(req.cookies?.token);
    // 在cookie和headers同时判断token
    const token = req.cookies?.token || req.headers.token;
    if (token) {
      // console.log(req.cookies.token);
      let user = null;
      validateToken(token, async (validateResult) => {
        if (validateResult.code) {
          const userId = validateResult.data.id;
          try {
            if (req.originalUrl.startsWith('/admin')) {
              user = await this.prisma.manager.findFirst({
                where: { id: userId },
              });
            } else {
              user = await this.prisma.user.findFirst({
                where: { id: userId },
              });
            }
          } catch (err) {
            // throw new UnauthorizedException();
            return this.resUnAuthorized(res);
          }

          // console.log(user);
          if (user) {
            req.user = user;
            next();
          } else {
            // throw new UnauthorizedException();
            return this.resUnAuthorized(res);
          }
        } else {
          // throw new UnauthorizedException();
          return this.resUnAuthorized(res);
        }
      });
    } else {
      // throw new UnauthorizedException();
      return this.resUnAuthorized(res);
    }
  }
}
