import { Module } from '@nestjs/common';
import { DoctorCommentsService } from './doctor-comments.service';
import { DoctorCommentsController } from './doctor-comments.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DoctorCommentsController],
  providers: [DoctorCommentsService, PrismaService],
})
export class DoctorCommentsModule {}
