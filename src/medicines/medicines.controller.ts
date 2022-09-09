import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { MedicinesService } from './medicines.service';
import { CategoryQueryInfo, QueryInfo } from './dto/create-medicine.dto';

@ApiTags('药品部分')
@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

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
    summary: '获取药品信息列表',
  })
  @Get()
  findAll(@Query() params: QueryInfo) {
    return this.medicinesService.findMedicines(
      params.keyword,
      params.page,
      params.per,
    );
  }

  @ApiOperation({
    summary: '获取药品分类',
  })
  // @ApiQuery({
  //   name: 'medicineCategoryId',
  //   description: '药品分类id，父级',
  //   schema: {
  //     type: 'string',
  //     default: '',
  //   },
  //   required: false,
  // })
  @Get('categories')
  findCategories(@Query() params: CategoryQueryInfo) {
    console.log(params);
    return this.medicinesService.findMedicineCategories(params.category);
  }

  @ApiOperation({
    summary: '常用药品',
  })
  @Get('standing_medicines')
  standingData() {
    return this.medicinesService.findStandingMedicines();
  }

  @ApiOperation({
    summary: '药品详情',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicinesService.findMedicine(id);
  }
}
