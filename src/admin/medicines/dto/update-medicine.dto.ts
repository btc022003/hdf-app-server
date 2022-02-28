import { PartialType } from '@nestjs/swagger';
import { CreateMedicineDto } from './create-medicine.dto';

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {}
