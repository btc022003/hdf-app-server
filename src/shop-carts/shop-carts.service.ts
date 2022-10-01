import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShopCartDto } from './dto/create-shop-cart.dto';
import { UpdateShopCartDto } from './dto/update-shop-cart.dto';

@Injectable()
export class ShopCartsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 新增数据到购物车中，需要先登录
   * @param createShopCartDto 购物车数据
   * @param user 用户id
   * @returns
   */
  async create(createShopCartDto: CreateShopCartDto, user: string) {
    const cartInfo = await this.prisma.shopCart.findFirst({
      where: {
        userId: user,
        medicineId: createShopCartDto.medicine,
      },
    });

    // 处理购物车中商品数量 start
    let amount = 1;
    // 购物车中存在的时候直接修改数量，不存在的时候加入购物车
    if (cartInfo) {
      amount = cartInfo.amount + createShopCartDto.amount;
    } else {
      // 如果不存在判断传递的数量参数，不能小于0.如果小于0 默认设置为1
      amount = cartInfo.amount > 0 ? cartInfo.amount : 1;
    }
    // end

    if (amount < 0) amount = 1; // 购物车中的商品数量不能少于1

    return this.prisma.shopCart.create({
      data: {
        userId: user,
        amount,
        price: createShopCartDto.price,
        medicineId: createShopCartDto.medicine,
      },
    });
  }

  /**
   * 获取购物车列表
   * @param user  用户id
   * @param page  页码
   * @param per   每页显示的数量
   * @returns
   */
  async findCarts(user: string, page = 1, per = 10) {
    page = isNaN(page) ? 1 : page * 1;
    per = isNaN(page) ? 10 : per * 1;

    const list = await this.prisma.shopCart.findMany({
      where: { userId: user },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * per,
      take: per,
    });
    const total = await this.prisma.shopCart.count({ where: { userId: user } });
    return {
      list,
      current: page,
      pageSize: per,
      total,
    };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} shopCart`;
  // }

  // update(id: number, updateShopCartDto: UpdateShopCartDto) {
  //   return `This action updates a #${id} shopCart`;
  // }

  /**
   * 删除多个
   * @param ids
   * @returns
   */
  remove(ids: string[]) {
    return this.prisma.shopCart.deleteMany({ where: { id: { in: ids } } });
  }
}
