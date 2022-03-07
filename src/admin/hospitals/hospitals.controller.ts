import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
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
