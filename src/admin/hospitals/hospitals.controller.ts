import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('后台-医院信息')
@Controller('admin/hospitals')
export class HospitalsController extends BaseController {
  constructor(
    private readonly hospitalsService: HospitalsService,
    private readonly prisma: PrismaService,
  ) {
    super(hospitalsService);
  }

  @ApiOperation({
    summary: '获取单条记录',
  })
  @Get(':id')
  one(@Param('id') id: string) {
    return this.prisma.hospital.findUnique({
      where: {
        id: id,
      },
      include: {
        doctors: true,
      },
    });
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalsService.create(createHospitalDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHospitalDto: UpdateHospitalDto,
  ) {
    return this.hospitalsService.update(id, updateHospitalDto);
  }
}
