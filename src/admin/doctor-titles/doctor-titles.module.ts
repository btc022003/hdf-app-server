import { Module } from '@nestjs/common';
import { DoctorTitlesService } from './doctor-titles.service';
import { DoctorTitlesController } from './doctor-titles.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DoctorTitlesController],
  providers: [DoctorTitlesService, PrismaService],
})
export class DoctorTitlesModule {}
