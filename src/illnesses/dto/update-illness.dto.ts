import { PartialType } from '@nestjs/swagger';
import { CreateIllnessDto } from './create-illness.dto';

export class UpdateIllnessDto extends PartialType(CreateIllnessDto) {}
