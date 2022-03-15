import { PartialType } from '@nestjs/swagger';
import { CreateMedicineCategoryDto } from './create-medicine-category.dto';

export class UpdateMedicineCategoryDto extends PartialType(
  CreateMedicineCategoryDto,
) {}
