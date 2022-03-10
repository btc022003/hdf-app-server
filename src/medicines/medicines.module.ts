import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MedicinesController],
  providers: [MedicinesService, PrismaService],
})
export class MedicinesModule {}
