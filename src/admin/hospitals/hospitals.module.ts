import { Module } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [HospitalsController],
  providers: [HospitalsService, PrismaService],
})
export class HospitalsModule {}
