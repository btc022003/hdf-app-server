import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { DoctorTagsService } from './doctor-tags.service';
import { CreateDoctorTagDto } from './dto/create-doctor-tag.dto';
import { UpdateDoctorTagDto } from './dto/update-doctor-tag.dto';

@ApiTags('后台-医生标签')
@Controller('admin/doctor_tags')
export class DoctorTagsController extends BaseController {
  constructor(private readonly doctorTagsService: DoctorTagsService) {
    super(doctorTagsService);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createDoctorTagDto: CreateDoctorTagDto) {
    return this.doctorTagsService.create(createDoctorTagDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorTagDto: UpdateDoctorTagDto,
  ) {
    return this.doctorTagsService.update(id, updateDoctorTagDto);
  }
}
