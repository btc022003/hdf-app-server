import { Module } from '@nestjs/common';
import { DoctorTagsService } from './doctor-tags.service';
import { DoctorTagsController } from './doctor-tags.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DoctorTagsController],
  providers: [DoctorTagsService, PrismaService],
})
export class DoctorTagsModule {}
