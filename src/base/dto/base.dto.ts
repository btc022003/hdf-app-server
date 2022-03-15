import { ApiProperty } from '@nestjs/swagger';

export class QueryInfo {
  page?: number;
  per?: number;
  name?: string;
}
