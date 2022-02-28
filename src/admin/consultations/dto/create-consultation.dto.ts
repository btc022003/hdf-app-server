import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateConsultationDto {
  @ApiProperty({
    description: '内容',
  })
  content: string;

  @ApiProperty({
    description: '回复',
  })
  reply: string;

  @ApiProperty({
    description: '是否支付',
  })
  isPayed: boolean;

  @ApiProperty({
    description: '是否回复',
  })
  isReply: boolean;

  @ApiProperty({
    description: '医生id',
  })
  doctorId: string;

  @ApiProperty({
    description: '用户id',
  })
  userId: string;
}
