import { PartialType } from '@nestjs/swagger';
import { CreateDoctorTitleDto } from './create-doctor-title.dto';

export class UpdateDoctorTitleDto extends PartialType(CreateDoctorTitleDto) {}
