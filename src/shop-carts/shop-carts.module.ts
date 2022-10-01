import { Module } from '@nestjs/common';
import { ShopCartsService } from './shop-carts.service';
import { ShopCartsController } from './shop-carts.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ShopCartsController],
  providers: [ShopCartsService, PrismaService],
})
export class ShopCartsModule {}
