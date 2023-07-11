import { PartialType } from '@nestjs/swagger';
import { CreateNursingWorkerDto } from './create-nursing-worker.dto';

export class UpdateNursingWorkerDto extends PartialType(CreateNursingWorkerDto) {}
