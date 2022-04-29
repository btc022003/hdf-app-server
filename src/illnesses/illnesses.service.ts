import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateIllnessDto } from './dto/create-illness.dto';
// import { UpdateIllnessDto } from './dto/update-illness.dto';

@Injectable()
export class IllnessesService {
  constructor(private readonly prisma: PrismaService) {}
  /**
   * 获取疾病分类
   * @returns
   */
  findIllnessCategories() {
    return this.prisma.illnessCategory.findMany({
      where: {},
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * 获取常见疾病
   * @returns
   */
  findStandingIllnesses() {
    return this.prisma.illness.findMany({
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
  async findIllnesses(keyword = '', page = 1, per = 10) {
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
    const list = await this.prisma.illness.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * per,
      take: per,
    });
    const total = await this.prisma.illness.count({ where });
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
  findIllness(id) {
    return this.prisma.illness.findFirst({
      where: { id },
      include: {
        illnessCategory: true,
        IllnessMedicine: {
          include: {
            medicine: true, // 多层关联
          },
        },
      },
    });
  }
}
