import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

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

export class QueryInfo {
  @ApiProperty({
    description: '关键词',
    required: false,
  })
  name: string;
  @ApiProperty({
    description: '分类id',
    required: false,
  })
  category: string;
  @ApiProperty({
    description: '每页显示的数量',
    required: false,
    default: 10,
  })
  per: number;
  @ApiProperty({
    description: '页码',
    required: false,
    default: 1,
  })
  page: number;
}
