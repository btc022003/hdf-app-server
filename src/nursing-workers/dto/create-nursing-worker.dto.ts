import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNursingWorkerDto {}

export class AskWork {
  @ApiProperty({
    description: '名字',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '手机号',
    required: true,
  })
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({
    description: '证件照',
    required: true,
  })
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({
    description: '身份证正面',
    required: true,
  })
  @IsNotEmpty()
  idCardFront: string;

  @ApiProperty({
    description: '身份证反面',
    required: true,
  })
  @IsNotEmpty()
  idCardBack: string;

  @ApiProperty({
    description: '详细介绍',
    required: false,
  })
  desc: string;
}
