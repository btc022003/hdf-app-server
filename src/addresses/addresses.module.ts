import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [AddressesController],
  providers: [AddressesService, PrismaService],
})
export class AddressesModule {}
