import { Module } from '@nestjs/common';
import { MedicineCategoriesService } from './medicine-categories.service';
import { MedicineCategoriesController } from './medicine-categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MedicineCategoriesController],
  providers: [MedicineCategoriesService, PrismaService],
})
export class MedicineCategoriesModule {}
