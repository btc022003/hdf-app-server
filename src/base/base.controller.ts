import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { BaseService } from './base.service';
export class BaseController {
  constructor(private readonly service: BaseService) {}

  @Get()
  index(@Query() query) {
    return this.service.findAll({}, query.page, query.per);
  }

  @Get('/:id')
  one(@Param() params) {
    return this.service.findOne(params.id);
  }

  @Post()
  @ApiBody({ type: Object })
  async create(@Body() createData) {
    const data = await this.service.create(createData); // 新增的数据进行保存
    return data;
  }

  @Patch(':id')
  @ApiBody({ type: Object })
  update(@Param('id') id: string, @Body() updateData) {
    return this.service.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
