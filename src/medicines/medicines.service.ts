import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MedicinesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 获取药品分类
   * @returns
   */
  findMedicineCategories() {
    return this.prisma.medicineCategory.findMany({
      where: {},
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
  async findMedicines(keyword = '', page = 1, per = 10) {
    page = isNaN(page) ? 1 : page * 1;
    per = isNaN(page) ? 10 : per * 1;
    const where = {
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
    const list = await this.prisma.medicine.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * per,
      take: per,
    });
    const total = await this.prisma.medicine.count({ where });
    return {
      list,
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
      },
    });
  }
}
