import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService, PrismaService],
})
export class DoctorsModule {}
