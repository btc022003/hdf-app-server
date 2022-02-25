import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('科室信息')
@Controller('admin/departments')
export class DepartmentsController extends BaseController {
  constructor(private readonly departmentsService: DepartmentsService) {
    super(departmentsService);
  }

  @ApiHeader({
    name: '获取所有的数据',
  })
  @Get('all')
  loadAll() {
    return this.departmentsService.all();
  }

  @ApiHeader({
    name: '新增',
    description: '数据新增',
  })
  @Post()
  async create(@Body() createData: CreateDepartmentDto) {
    const data = await this.departmentsService.create(createData); // 新增的数据进行保存
    return data;
  }

  @ApiHeader({
    name: '修改',
    description: '根据id修改一条数据记录',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateData);
  }
}
