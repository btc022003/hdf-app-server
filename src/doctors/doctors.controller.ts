import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { QueryInfo } from './dto/create-doctor.dto';

@ApiTags('医生部分')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiHeader({
    name: '医生信息列表',
  })
  @Get('')
  doctors(@Query() query: QueryInfo) {
    const where: QueryInfo = {};
    if (query.name) {
      where.name = { contains: query.name };
    }
    if (query.department) {
      where.department = query.department;
    }
    if (query.tags) {
      where.tags = { contains: query.tags };
    }
    return this.doctorsService.doctors(where); // 所有的医生信息
  }

  @ApiHeader({
    name: '科室信息',
  })
  @Get('departments')
  departments() {
    return this.doctorsService.departments();
  }

  @ApiHeader({
    name: '职称',
  })
  @Get('titles')
  titles() {
    return this.doctorsService.titles();
  }

  @ApiHeader({
    name: '医生标签，擅长的疾病',
  })
  @Get('tags')
  tags() {
    return this.doctorsService.tags();
  }

  @ApiHeader({
    name: '单个医生信息',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.oneDoctor(id);
  }
}
