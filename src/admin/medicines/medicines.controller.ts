import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { BaseController } from 'src/base/base.controller';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('后台-药品信息')
@Controller('admin/medicines')
export class MedicinesController extends BaseController {
  constructor(private readonly medicinesService: MedicinesService) {
    super(medicinesService);
  }

  @ApiHeader({
    name: '新增',
    description: '数据新增',
  })
  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.create(createMedicineDto);
  }

  @ApiHeader({
    name: '修改',
    description: '根据id修改一条数据记录',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicinesService.update(id, updateMedicineDto);
  }
}
