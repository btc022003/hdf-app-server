import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, QueryInfo } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('后台-文章信息')
@Controller('admin/articles')
export class ArticlesController extends BaseController {
  constructor(private readonly articlesService: ArticlesService) {
    super(articlesService);
  }

  @ApiOperation({
    summary: '分页形式获取列表数据',
  })
  @Get()
  index(@Query() query: QueryInfo) {
    const { page, per } = query;
    const where: any = {};
    if (query.name) {
      where.name = { contains: query.name };
    }
    if (query.category) {
      where.articleCategoryId = query.category;
    }
    return this.articlesService.findAll(where, page, per);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }
}
