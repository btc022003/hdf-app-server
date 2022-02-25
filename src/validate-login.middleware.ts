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
    next();
    //   if (req.cookies?.token) {
    //     const user = await this.prisma.user.count({
    //       where: { id: req.cookies.token },
    //     });
    //     if (user > 0) {
    //       next();
    //     } else {
    //       throw new UnauthorizedException();
    //     }
    //   } else {
    //     throw new UnauthorizedException();
    //   }
  }
}
