import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { QueryInfo } from './dto/create-doctor.dto';

@ApiTags('医生部分')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiOperation({
    summary: '医生信息列表',
  })
  @ApiQuery({
    name: 'name',
    description: '名字',
    schema: {
      type: 'string',
      default: '',
    },
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: '页码',
    required: false,
    schema: {
      type: 'integer',
      default: 1,
    },
  })
  @ApiQuery({
    name: 'per',
    description: '每页显示的数量',
    required: false,
    schema: {
      type: 'integer',
      default: 10,
    },
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

    return this.doctorsService.doctors(where, query.page, query.per); // 所有的医生信息
  }

  @ApiOperation({
    summary: '科室信息',
  })
  @Get('departments')
  departments() {
    return this.doctorsService.departments();
  }

  @ApiOperation({
    summary: '职称',
  })
  @Get('titles')
  titles() {
    return this.doctorsService.titles();
  }

  @ApiOperation({
    summary: '医生标签，擅长的疾病',
  })
  @Get('tags')
  tags() {
    return this.doctorsService.tags();
  }

  @ApiOperation({
    summary: '单个医生信息',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.oneDoctor(id);
  }
}
