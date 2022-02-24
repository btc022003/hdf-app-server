import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';

// 所有管理后台部分的都加Admin前缀
import { UsersModule as AdminUsersModule } from './admin/users/users.module';
import { ValidateLoginMiddleware } from './validate-login.middleware';
import { CommonController } from './common/common.controller';

@Module({
  imports: [UsersModule, AdminUsersModule],
  controllers: [AppController, CommonController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateLoginMiddleware).forRoutes(...['admin/*']); // 使用中间件
  }
}
