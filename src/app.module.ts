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
import { DoctorTagsModule as AdminDoctorTagsModule } from './admin/doctor-tags/doctor-tags.module';
import { DoctorCommentsModule as AdminDoctorCommentsModule } from './admin/doctor-comments/doctor-comments.module';
import { HospitalsModule as AdminHospitalsModule } from './admin/hospitals/hospitals.module';
import { ConsultationsModule as AdminConsultationsModule } from './admin/consultations/consultations.module';
import { MedicineCategoriesModule as AdminMedicineCategoriesModule } from './admin/medicine-categories/medicine-categories.module';
import { MedicinesModule as AdminMedicinesModule } from './admin/medicines/medicines.module';
import { ChatsModule } from './chats/chats.module';
import { ArticleCategoriesModule as AdminArticleCategoriesModule } from './admin/article-categories/article-categories.module';
import { ArticlesModule as AdminArticlesModule } from './admin/articles/articles.module';
import { ManagersModule as AdminManagersModule } from './admin/managers/managers.module';
import { RolesModule as AdminRolesModule } from './admin/roles/roles.module';
import { PermissionsModule as AdminPermissionsModule } from './admin/permissions/permissions.module';
import { IllnessesModule as AdminIllnessesModule } from './admin/illnesses/illnesses.module';
import { IllnessCategoriesModule as AdminIllnessCategoriesModule } from './admin/illness-categories/illness-categories.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    UsersModule,
    AdminUsersModule,
    AdminDoctorsModule,
    AdminDoctorTitlesModule,
    AdminDepartmentsModule,
    AdminDoctorTagsModule,
    AdminDoctorCommentsModule,
    AdminHospitalsModule,
    AdminConsultationsModule,
    AdminMedicineCategoriesModule,
    AdminMedicinesModule,
    ChatsModule,
    AdminArticleCategoriesModule,
    AdminArticlesModule,
    AdminManagersModule,
    AdminRolesModule,
    AdminPermissionsModule,
    AdminIllnessesModule,
    AdminIllnessCategoriesModule,
    MembersModule,
  ],
  controllers: [AppController, CommonController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateLoginMiddleware)
      .forRoutes(...['admin/*', 'members/*']); // 使用中间件
  }
}
