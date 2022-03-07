import { Module } from '@nestjs/common';
import { IllnessCategoriesService } from './illness-categories.service';
import { IllnessCategoriesController } from './illness-categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [IllnessCategoriesController],
  providers: [IllnessCategoriesService, PrismaService],
})
export class IllnessCategoriesModule {}
