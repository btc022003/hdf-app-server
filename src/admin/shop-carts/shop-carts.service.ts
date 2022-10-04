import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateShopCartDto } from './dto/create-shop-cart.dto';
// import { UpdateShopCartDto } from './dto/update-shop-cart.dto';

@Injectable()
export class ShopCartsService extends BaseService {
  constructor(private prisma: PrismaService) {
    super(prisma.shopCart);
  }
  // create(createShopCartDto: CreateShopCartDto) {
  //   return 'This action adds a new shopCart';
  // }

  async findByUser(userId: string) {
    return this.prisma.shopCart.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} shopCart`;
  // }

  // update(id: number, updateShopCartDto: UpdateShopCartDto) {
  //   return `This action updates a #${id} shopCart`;
  // }

  /**
   *
   * @param id 根据id删除一个
   * @returns
   */
  remove(id: string) {
    return this.prisma.shopCart.delete({ where: { id } });
  }

  /**
   * 根据id组成的数组删除多个
   * @param ids
   * @returns
   */
  removeMany(ids: string[]) {
    return this.prisma.shopCart.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
