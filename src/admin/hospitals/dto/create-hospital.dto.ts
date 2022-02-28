import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateHospitalDto {
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
    description: '图片',
  })
  image: string;

  @ApiProperty({
    description: '详情',
  })
  content: string;

  @ApiProperty({
    description: '地址',
  })
  address: string;

  @ApiProperty({
    description: '联系方式',
  })
  phone: string;
}
