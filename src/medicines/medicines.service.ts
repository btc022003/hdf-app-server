import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MedicinesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 获取药品分类
   * @returns
   */
  findMedicineCategories(medicineCategoryId = '') {
    const where = medicineCategoryId ? { medicineCategoryId } : {};
    return this.prisma.medicineCategory.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * 查找常用药
   * @returns
   */
  findStandingMedicines() {
    return this.prisma.medicine.findMany({
      where: {
        isStanding: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * 分页查找药品信息
   * @param keyword
   * @param page
   * @param per
   * @returns
   */
  async findMedicines(keyword = '', page = 1, per = 10, category = '') {
    page = isNaN(page) ? 1 : page * 1;
    per = isNaN(per) ? 10 : per * 1;
    console.log(per);
    const where: any = {
      OR: [
        {
          name: {
            contains: keyword,
          },
        },
        {
          desc: {
            contains: keyword,
          },
        },
        {
          content: {
            contains: keyword,
          },
        },
        {
          tags: {
            contains: keyword,
          },
        },
      ],
    };
    // console.log('当前的分类id:' + category);
    if (category) where.medicineCategoryId = category;
    const list = await this.prisma.medicine.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
      skip: (page - 1) * per,
      take: per,
    });
    const total = await this.prisma.medicine.count({ where });
    return {
      list: list.map((item) => {
        delete item.content;
        return item;
      }),
      current: page,
      pageSize: per,
      total,
    };
  }

  /**
   * 根据id获取详情
   * @param id
   * @returns
   */
  findMedicine(id) {
    return this.prisma.medicine.findFirst({
      where: { id },
      include: {
        category: true,
        illnessMedicine: {
          include: {
            illness: true, // 多层关联
          },
        },
      },
    });
  }
}
