import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';

@ApiTags('医院信息')
@Controller('admin/hospitals')
export class HospitalsController extends BaseController {
  constructor(private readonly hospitalsService: HospitalsService) {
    super(hospitalsService);
  }

  @ApiHeader({
    name: '新增',
    description: '数据新增',
  })
  @Post()
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalsService.create(createHospitalDto);
  }

  @ApiHeader({
    name: '修改',
    description: '根据id修改一条数据记录',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHospitalDto: UpdateHospitalDto,
  ) {
    return this.hospitalsService.update(id, updateHospitalDto);
  }
}
