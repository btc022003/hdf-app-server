import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMedicineDto {
  @ApiProperty({
    description: '名字',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '描述',
  })
  desc: string;

  @ApiProperty({
    description: '价格',
  })
  price: number;

  @ApiProperty({
    description: '库存',
  })
  amount: number;

  @ApiProperty({
    description: '主图',
  })
  image: string;

  @ApiProperty({
    description: '标签',
  })
  tags: string;

  @ApiProperty({
    description: '详细信息',
  })
  content: string;

  @ApiProperty({
    description: '是否常备药',
  })
  isStanding: boolean;

  @ApiProperty({
    description: '分类id',
  })
  medicineCategoryId: string;

  @ApiProperty({
    description: '疾病id',
  })
  illnesses: string[];
}
