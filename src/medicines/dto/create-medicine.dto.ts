import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty } from 'class-validator';

export class CreateMedicineDto {}

export class QueryInfo {
  keyword?: string;
  page?: number;
  per?: number;
}

export class CategoryQueryInfo {
  @ApiProperty({
    description: '分类id，父级',
    required: false,
  })
  category: string;
}
