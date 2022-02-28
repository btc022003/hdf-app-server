import { Module } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { ConsultationsController } from './consultations.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ConsultationsController],
  providers: [ConsultationsService, PrismaService],
})
export class ConsultationsModule {}
