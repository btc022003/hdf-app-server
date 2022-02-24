import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';

// 所有管理后台部分的都加Admin前缀
import { UsersModule as AdminUsersModule } from './admin/users/users.module';

@Module({
  imports: [UsersModule, AdminUsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
