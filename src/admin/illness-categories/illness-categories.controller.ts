import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { IllnessCategoriesService } from './illness-categories.service';
import { CreateIllnessCategoryDto } from './dto/create-illness-category.dto';
import { UpdateIllnessCategoryDto } from './dto/update-illness-category.dto';
import { BaseController } from 'src/base/base.controller';

@ApiTags('疾病分类')
@Controller('admin/illness_categories')
export class IllnessCategoriesController extends BaseController {
  constructor(
    private readonly illnessCategoriesService: IllnessCategoriesService,
  ) {
    super(illnessCategoriesService);
  }

  @ApiHeader({
    name: '新增',
    description: '数据新增',
  })
  @Post()
  create(@Body() createIllnessCategoryDto: CreateIllnessCategoryDto) {
    return this.illnessCategoriesService.create(createIllnessCategoryDto);
  }

  @ApiHeader({
    name: '修改',
    description: '根据id修改一条数据记录',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIllnessCategoryDto: UpdateIllnessCategoryDto,
  ) {
    return this.illnessCategoriesService.update(id, updateIllnessCategoryDto);
  }
}
