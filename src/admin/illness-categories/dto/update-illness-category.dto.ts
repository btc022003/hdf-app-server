import { PartialType } from '@nestjs/swagger';
import { CreateIllnessCategoryDto } from './create-illness-category.dto';

export class UpdateIllnessCategoryDto extends PartialType(CreateIllnessCategoryDto) {}
