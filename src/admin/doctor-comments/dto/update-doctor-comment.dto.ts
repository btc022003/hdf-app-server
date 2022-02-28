import { PartialType } from '@nestjs/swagger';
import { CreateDoctorCommentDto } from './create-doctor-comment.dto';

export class UpdateDoctorCommentDto extends PartialType(
  CreateDoctorCommentDto,
) {}
