import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateIllnessDto {
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
    description: '主图',
  })
  image: string;

  @ApiProperty({
    description: '标签',
  })
  tags: string;

  @ApiProperty({
    description: '详情',
  })
  content: string;

  @ApiProperty({
    description: '浏览次数',
  })
  views: number;

  @ApiProperty({
    description: '是否常见疾病',
  })
  isStanding: boolean;

  @ApiProperty({
    description: '疾病分类id',
  })
  illnessCategoryId: string;
}
