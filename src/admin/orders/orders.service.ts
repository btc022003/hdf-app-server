import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService extends BaseService {
  constructor(private prisma: PrismaService) {
    super(prisma.order, {
      user: true,
      orderDetails: true,
    });
  }

  /**
   * 根据id获取当前用户的所有订单
   * @param userId
   * @returns
   */
  findOrdersByUserId(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        user: true,
        orderDetails: {
          include: {
            medicine: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
