import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ManagersController],
  providers: [ManagersService, PrismaService],
})
export class ManagersModule {}
