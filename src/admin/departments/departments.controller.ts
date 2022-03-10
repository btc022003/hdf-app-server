import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('后台-科室信息')
@Controller('admin/departments')
export class DepartmentsController extends BaseController {
  constructor(private readonly departmentsService: DepartmentsService) {
    super(departmentsService);
  }

  @ApiOperation({
    summary: '获取所有的数据',
  })
  @Get('all')
  loadAll() {
    return this.departmentsService.all();
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  async create(@Body() createData: CreateDepartmentDto) {
    return this.departmentsService.create(createData); // 新增的数据进行保存
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateData);
  }
}
