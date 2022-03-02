import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleCategoryDto {
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
}
