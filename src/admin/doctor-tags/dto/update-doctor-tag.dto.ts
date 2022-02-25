import { PartialType } from '@nestjs/swagger';
import { CreateDoctorTagDto } from './create-doctor-tag.dto';

export class UpdateDoctorTagDto extends PartialType(CreateDoctorTagDto) {}
