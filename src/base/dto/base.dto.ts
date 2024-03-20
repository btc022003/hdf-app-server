import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QueryInfo {
  page?: number;
  per?: number;
  name?: string;
}

export class DeleteManyInfo {
  @ApiProperty({
    description: '需要删除的id，多个实用,分割',
    // required: true,
  })
  @IsNotEmpty()
  ids: string;
}
