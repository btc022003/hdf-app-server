import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('admin/departments')
export class DepartmentsController extends BaseController {
  constructor(private readonly departmentsService: DepartmentsService) {
    super(departmentsService);
  }

  @Post()
  async create(@Body() createData: CreateDepartmentDto) {
    const data = await this.departmentsService.create(createData); // 新增的数据进行保存
    return data;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateData);
  }
}
