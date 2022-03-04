import { PartialType } from '@nestjs/swagger';
import { CreateManagerDto } from './create-manager.dto';

export class UpdateManagerDto extends PartialType(CreateManagerDto) {}
