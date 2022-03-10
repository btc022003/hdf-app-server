import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BaseService } from './base.service';
export class BaseController {
  constructor(private readonly service: BaseService) {}

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
  @Get()
  index(@Query() query) {
    const where: any = {};
    if (query.name) {
      where.name = { contains: query.name };
    }
    return this.service.findAll(where, query.page, query.per);
  }

  @ApiHeader({
    name: '获取单条记录',
    description: '根据id获取单条记录',
  })
  @ApiParam({
    name: 'id',
  })
  @Get(':id')
  one(@Param() params) {
    return this.service.findOne(params.id);
  }

  @ApiHeader({
    name: '新增',
    description: '数据新增',
  })
  @Post()
  @ApiBody({ type: Object })
  async create(@Body() createData) {
    const data = await this.service.create(createData); // 新增的数据进行保存
    return data;
  }

  @ApiHeader({
    name: '修改',
    description: '根据id修改数据',
  })
  @Patch(':id')
  @ApiBody({ type: Object })
  update(@Param('id') id: string, @Body() updateData) {
    return this.service.update(id, updateData);
  }

  @ApiHeader({
    name: '删除',
    description: '根据id删除单条数据',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
