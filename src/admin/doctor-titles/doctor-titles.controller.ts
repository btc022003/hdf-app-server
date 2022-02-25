import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { DoctorTitlesService } from './doctor-titles.service';
import { CreateDoctorTitleDto } from './dto/create-doctor-title.dto';
import { UpdateDoctorTitleDto } from './dto/update-doctor-title.dto';

@ApiTags('职称信息')
@Controller('admin/doctor_titles')
export class DoctorTitlesController extends BaseController {
  constructor(private readonly doctorTitleService: DoctorTitlesService) {
    super(doctorTitleService);
  }

  @Post()
  async create(@Body() createData: CreateDoctorTitleDto) {
    const data = await this.doctorTitleService.create(createData); // 新增的数据进行保存
    return data;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateDoctorTitleDto) {
    return this.doctorTitleService.update(id, updateData);
  }
}
