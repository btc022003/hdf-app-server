import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 获取文章分类
   * @returns
   */
  findArticleCategories() {
    // Logger.error('1212'); // 使用日志模块输出内容
    return this.prisma.articleCategory.findMany({
      where: {},
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * 分页查找文章信息
   * @param keyword
   * @param page
   * @param per
   * @returns
   */
  async findArticles(keyword = '', page = 1, per = 10, category = '') {
    page = isNaN(page) ? 1 : page * 1;
    per = isNaN(page) ? 10 : per * 1;
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
    if (category) {
      where.articleCategoryId = category;
    }

    const list = await this.prisma.article.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * per,
      take: per,
    });
    const total = await this.prisma.article.count({ where });
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
  async findArticle(id) {
    await this.prisma.article.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return this.prisma.article.findFirst({
      where: { id },
      include: {
        category: true,
      },
    });
  }
}
