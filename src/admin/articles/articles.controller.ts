import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('文章信息')
@Controller('admin/articles')
export class ArticlesController extends BaseController {
  constructor(private readonly articlesService: ArticlesService) {
    super(articlesService);
  }

  @ApiHeader({
    name: '新增',
    description: '数据新增',
  })
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @ApiHeader({
    name: '修改',
    description: '根据id修改一条数据记录',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }
}
