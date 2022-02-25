import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorTitlesService } from './doctor-titles.service';
import { CreateDoctorTitleDto } from './dto/create-doctor-title.dto';
import { UpdateDoctorTitleDto } from './dto/update-doctor-title.dto';

@Controller('admin/doctor_titles')
export class DoctorTitlesController {
  constructor(private readonly doctorTitlesService: DoctorTitlesService) {}

  @Post()
  create(@Body() createDoctorTitleDto: CreateDoctorTitleDto) {
    return this.doctorTitlesService.create(createDoctorTitleDto);
  }

  @Get()
  findAll() {
    return this.doctorTitlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorTitlesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorTitleDto: UpdateDoctorTitleDto,
  ) {
    return this.doctorTitlesService.update(+id, updateDoctorTitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorTitlesService.remove(+id);
  }
}
