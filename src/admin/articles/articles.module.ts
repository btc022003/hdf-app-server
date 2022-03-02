import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, PrismaService],
})
export class ArticlesModule {}
