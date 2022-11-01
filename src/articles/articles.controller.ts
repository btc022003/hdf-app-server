import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { QueryInfo } from './dto/create-article.dto';

@ApiTags('文章部分')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiQuery({
    name: 'keyword',
    description: '查询关键词',
    schema: {
      type: 'string',
      default: '',
    },
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: '页码',
    required: false,
    schema: {
      type: 'integer',
      default: 1,
    },
  })
  @ApiQuery({
    name: 'per',
    description: '每页显示的数量',
    required: false,
    schema: {
      type: 'integer',
      default: 10,
    },
  })
  @ApiOperation({
    summary: '获取文章信息列表',
  })
  @Get()
  findAll(@Query() params: QueryInfo) {
    return this.articlesService.findArticles(
      params.keyword,
      params.page,
      params.per,
      params.category,
    );
  }

  @ApiOperation({
    summary: '获取分类',
  })
  @Get('categories')
  findCategories() {
    return this.articlesService.findArticleCategories();
  }

  @ApiOperation({
    summary: '详情',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findArticle(id);
  }
}
