import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';

// 所有管理后台部分的都加Admin前缀
import { UsersModule as AdminUsersModule } from './admin/users/users.module';
import { ValidateLoginMiddleware } from './validate-login.middleware';
import { CommonController } from './common/common.controller';
import { DoctorsModule as AdminDoctorsModule } from './admin/doctors/doctors.module';
import { DoctorTitlesModule as AdminDoctorTitlesModule } from './admin/doctor-titles/doctor-titles.module';
import { DepartmentsModule as AdminDepartmentsModule } from './admin/departments/departments.module';

@Module({
  imports: [
    UsersModule,
    AdminUsersModule,
    AdminDoctorsModule,
    AdminDoctorTitlesModule,
    AdminDepartmentsModule,
  ],
  controllers: [AppController, CommonController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateLoginMiddleware).forRoutes(...['admin/*']); // 使用中间件
  }
}
