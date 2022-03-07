import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@ApiTags('后台-医生信息')
@Controller('admin/doctors')
export class DoctorsController extends BaseController {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly prisma: PrismaService,
  ) {
    super(doctorsService);
  }

  // 重写默认的分页方法，传递需要关联查询的数据
  @Get()
  index(@Query() query) {
    return this.doctorsService.findAll({}, query.page, query.per, {
      doctorTitleInfo: true,
      departmentInfo: true,
      hospitalInfo: true,
    });
  }

  @Get('comments/:doctor_id')
  comments(@Param('doctor_id') doctor_id: string) {
    // return this.doctorsServic
    return this.prisma.doctorComment.findMany({
      where: {
        doctorId: doctor_id,
      },
    });
  }

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }
}

// @Controller('admin/doctors')
// export class DoctorsController {
//   constructor(private readonly doctorsService: DoctorsService) {}

//   @Post()
//   create(@Body() createDoctorDto: CreateDoctorDto) {
//     return this.doctorsService.create(createDoctorDto);
//   }

//   @Get()
//   findAll() {
//     return this.doctorsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.doctorsService.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
//     return this.doctorsService.update(id, updateDoctorDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.doctorsService.remove(id);
//   }
// }
