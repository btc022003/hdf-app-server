import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IllnessCategoriesService } from './illness-categories.service';
import { CreateIllnessCategoryDto } from './dto/create-illness-category.dto';
import { UpdateIllnessCategoryDto } from './dto/update-illness-category.dto';
import { BaseController } from 'src/base/base.controller';

@ApiTags('后台-疾病分类')
@Controller('admin/illness_categories')
export class IllnessCategoriesController extends BaseController {
  constructor(
    private readonly illnessCategoriesService: IllnessCategoriesService,
  ) {
    super(illnessCategoriesService);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createIllnessCategoryDto: CreateIllnessCategoryDto) {
    return this.illnessCategoriesService.create(createIllnessCategoryDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIllnessCategoryDto: UpdateIllnessCategoryDto,
  ) {
    return this.illnessCategoriesService.update(id, updateIllnessCategoryDto);
  }
}
