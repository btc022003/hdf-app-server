import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { BaseController } from 'src/base/base.controller';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryInfo } from 'src/medicines/dto/create-medicine.dto';

@ApiTags('后台-药品信息')
@Controller('admin/medicines')
export class MedicinesController extends BaseController {
  constructor(private readonly medicinesService: MedicinesService) {
    super(medicinesService);
  }

  @ApiOperation({
    summary: '分页形式获取列表数据',
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
  @ApiQuery({
    name: 'name',
    description: '查询关键词，如果用name属性的时候使用',
    required: false,
    schema: {
      type: 'string',
      default: '',
    },
  })
  @ApiQuery({
    name: 'category',
    description: '查询的商品的分类id',
    required: false,
    schema: {
      type: 'string',
      default: '',
    },
  })
  @Get()
  index(@Query() query: QueryInfo) {
    const { page, per } = query;
    const where: any = {};
    if (query) {
      where.name = { contains: query.name };
      if (query.name) {
        where.name = { contains: query.name };
      }
      if (query.category) {
        where.medicineCategoryId = query.category;
      }
    }
    return this.medicinesService.findAll(where, page, per);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.create(createMedicineDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicinesService.update(id, updateMedicineDto);
  }

  @ApiOperation({
    summary: '获取单条记录',
  })
  @ApiParam({
    name: 'id',
  })
  @Get(':id')
  one(@Param() params) {
    return this.medicinesService.findOne(params.id, {
      category: true,
      illnessMedicine: {
        include: {
          illness: true, // 多层关联
        },
      },
    });
  }
}
