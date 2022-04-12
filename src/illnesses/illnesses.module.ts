import { Module } from '@nestjs/common';
import { IllnessesService } from './illnesses.service';
import { IllnessesController } from './illnesses.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [IllnessesController],
  providers: [IllnessesService, PrismaService],
})
export class IllnessesModule {}
