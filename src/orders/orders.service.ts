import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建订单数据
   * @param createOrderDto 数据
   * @param user 用户id
   * @returns
   */
  async create(createOrderDto: CreateOrderDto, user: string) {
    const order = await this.prisma.order.create({
      data: {
        userId: user,
        address: createOrderDto.address,
        region: createOrderDto.region,
        regionCode: createOrderDto.regionCode,
      },
    });
    // 获取订单详情信息
    const orderDetails = createOrderDto.orderDetails.map((item) => {
      return {
        price: item.price,
        medicineId: item.medicine,
        amount: item.amount,
        orderId: order.id,
      };
    });
    // 创建订单详情
    await this.prisma.orderDetail.createMany({
      data: orderDetails,
    });
    return order;
  }

  async findOrders(
    user: string,
    status = -1, // -1 获取所有的
    payed = -1, // 0 未完成，1已完成
    end = -1, // 0 未支付，1已支付
    page = 1,
    per = 10,
  ) {
    page = isNaN(page) ? 1 : page * 1;
    per = isNaN(page) ? 10 : per * 1;
    const where: any = {
      userId: user,
    };
    // 是否完成
    if (end > -1) where.isEnd = end == 0 ? false : true;
    // 是否支付
    if (payed > -1) where.isPayed = payed == 0 ? false : true;
    // 状态信息
    if (status > -1) where.status = status;
    const list = await this.prisma.order.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        orderDetails: {
          include: {
            medicine: true,
          },
        },
      },
      skip: (page - 1) * per,
      take: per,
    });
    const total = await this.prisma.order.count({
      where,
    });
    return {
      list,
      current: page,
      pageSize: per,
      total,
    };
  }

  /**
   * 根据id查找一个
   * @param id
   * @returns
   */
  findOne(id: string) {
    return this.prisma.order.findFirst({
      where: { id },
      include: {
        orderDetails: {
          include: {
            medicine: true,
          },
        },
      },
    });
  }

  /**
   * 根据id修改数据
   * @param id 要修改的id
   * @param updateOrderDto 数据
   * @returns
   */
  update(id: string, updateOrderDto: UpdateOrderDto) {
    const { orderDetails, ...orderInfo } = updateOrderDto;
    return this.prisma.order.update({
      where: { id },
      data: { ...orderInfo },
    });
  }

  /**
   * 根据id删除多个记录
   * @param ids 需要删除的id组成的数组
   * @returns
   */
  remove(ids: string[]) {
    return this.prisma.order.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
