import { Injectable } from '@nestjs/common';
import { CreateDoctorTitleDto } from './dto/create-doctor-title.dto';
import { UpdateDoctorTitleDto } from './dto/update-doctor-title.dto';

@Injectable()
export class DoctorTitlesService {
  create(createDoctorTitleDto: CreateDoctorTitleDto) {
    return 'This action adds a new doctorTitle';
  }

  findAll() {
    return `This action returns all doctorTitles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorTitle`;
  }

  update(id: number, updateDoctorTitleDto: UpdateDoctorTitleDto) {
    return `This action updates a #${id} doctorTitle`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorTitle`;
  }
}
