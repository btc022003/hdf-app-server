import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { BaseController } from 'src/base/base.controller';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('后台-药品信息')
@Controller('admin/medicines')
export class MedicinesController extends BaseController {
  constructor(private readonly medicinesService: MedicinesService) {
    super(medicinesService);
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
