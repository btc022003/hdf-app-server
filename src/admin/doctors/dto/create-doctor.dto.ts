import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({
    description: '名字',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '简介',
  })
  desc: string;

  @ApiProperty({
    description: '标签、特长,多个用逗号分隔',
  })
  tags: string;

  @ApiProperty({
    description: '详细介绍信息',
  })
  content: string;

  @ApiProperty({
    description: '头像',
  })
  avatar: string;

  @ApiProperty({
    description: '职称id',
  })
  doctorTitleId: string;

  @ApiProperty({
    description: '部门id',
  })
  departmentId: string;
}
