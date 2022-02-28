import { PartialType } from '@nestjs/swagger';
import { CreateHospitalDto } from './create-hospital.dto';

export class UpdateHospitalDto extends PartialType(CreateHospitalDto) {}
