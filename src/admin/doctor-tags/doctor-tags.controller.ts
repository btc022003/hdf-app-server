import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { DoctorTagsService } from './doctor-tags.service';
import { CreateDoctorTagDto } from './dto/create-doctor-tag.dto';
import { UpdateDoctorTagDto } from './dto/update-doctor-tag.dto';

@ApiTags('医生标签')
@Controller('admin/doctor_tags')
export class DoctorTagsController extends BaseController {
  constructor(private readonly doctorTagsService: DoctorTagsService) {
    super(doctorTagsService);
  }

  @ApiHeader({
    name: '新增',
    description: '数据新增',
  })
  @Post()
  create(@Body() createDoctorTagDto: CreateDoctorTagDto) {
    return this.doctorTagsService.create(createDoctorTagDto);
  }

  @ApiHeader({
    name: '修改',
    description: '根据id修改一条数据记录',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorTagDto: UpdateDoctorTagDto,
  ) {
    return this.doctorTagsService.update(id, updateDoctorTagDto);
  }
}
