import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
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
    description: '浏览次数',
  })
  views: number;

  @ApiProperty({
    description: '详情',
  })
  content: string;

  @ApiProperty({
    description: '分类id',
  })
  articleCategoryId: string;
}
