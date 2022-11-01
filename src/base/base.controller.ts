import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BaseService } from './base.service';
import { QueryInfo } from './dto/base.dto';
export class BaseController {
  constructor(private readonly service: BaseService) {}

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
  @Get()
  index(@Query() query: QueryInfo) {
    const { page, per } = query;
    const where: any = {};
    if (query.name) {
      where.name = { contains: query.name };
    }
    console.log(this.service.model.name);
    return this.service.findAll(where, page, per);
  }

  @ApiOperation({
    summary: '获取单条记录',
  })
  @ApiParam({
    name: 'id',
  })
  @Get(':id')
  one(@Param() params) {
    return this.service.findOne(params.id);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  @ApiBody({ type: Object })
  async create(@Body() createData) {
    const data = await this.service.create(createData); // 新增的数据进行保存
    return data;
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  @ApiBody({ type: Object })
  update(@Param('id') id: string, @Body() updateData) {
    return this.service.update(id, updateData);
  }

  @ApiOperation({
    summary: '删除多个',
  })
  @ApiQuery({
    name: 'ids',
    description: '需要删除的id，多个用,分割',
    required: true,
  })
  @Delete('remove_many')
  removeMany(@Query() query) {
    return this.service.removeMany(query.ids.split(','));
  }

  @ApiOperation({
    summary: '删除',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
