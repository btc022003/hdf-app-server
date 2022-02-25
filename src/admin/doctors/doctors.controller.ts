import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

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

@Controller('admin/doctors')
export class DoctorsController extends BaseController {
  constructor(private readonly doctorsService: DoctorsService) {
    super(doctorsService);
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
