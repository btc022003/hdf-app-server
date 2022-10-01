import { Injectable } from '@nestjs/common';
import { data } from 'cheerio/lib/api/attributes';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 新增地址数据
   * @param createAddressDto
   * @returns
   */
  async create(createAddressDto: CreateAddressDto, userId: string) {
    // 传递的数据设为默认，把以前的数据改为非默认。只能有一个默认地址
    if (createAddressDto.isDefault) {
      await this.prisma.address.updateMany({
        data: {
          isDefault: false,
        },
        where: {
          userId,
        },
      });
    }
    return this.prisma.address.create({
      data: { ...createAddressDto, userId },
    });
  }

  /**
   * 查找当前用户的所有地址数据
   * @param userId  用户id
   * @returns
   */
  findAll(userId: string) {
    return this.prisma.address.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * 获取单条地址数据
   * @param id
   * @returns
   */
  findOne(id: string) {
    return this.prisma.address.findFirst({
      where: {
        id,
      },
    });
  }

  /**
   * 根据id修改数据
   * @param id
   * @param updateAddressDto
   * @returns
   */
  async update(id: string, updateAddressDto: UpdateAddressDto, userId: string) {
    // console.log(userId);
    // console.log(updateAddressDto.isDefault);
    if (updateAddressDto.isDefault) {
      // 重置其他的为非默认
      await this.prisma.address.updateMany({
        data: {
          isDefault: false,
        },
        where: {
          userId,
        },
      });
    }
    return this.prisma.address.update({
      data: updateAddressDto,
      where: {
        id,
      },
    });
  }

  /**
   * 删除地址信息
   * @param ids
   * @returns
   */
  remove(ids: string[]) {
    return this.prisma.address.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
