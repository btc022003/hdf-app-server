import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { MedicineCategoriesService } from './medicine-categories.service';
import { CreateMedicineCategoryDto } from './dto/create-medicine-category.dto';
import { UpdateMedicineCategoryDto } from './dto/update-medicine-category.dto';
import { BaseController } from 'src/base/base.controller';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('后台-药品分类')
@Controller('admin/medicine_categories')
export class MedicineCategoriesController extends BaseController {
  constructor(
    private readonly medicineCategoriesService: MedicineCategoriesService,
  ) {
    super(medicineCategoriesService);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createMedicineCategoryDto: CreateMedicineCategoryDto) {
    return this.medicineCategoriesService.create(createMedicineCategoryDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicineCategoryDto: UpdateMedicineCategoryDto,
  ) {
    return this.medicineCategoriesService.update(id, updateMedicineCategoryDto);
  }
}
