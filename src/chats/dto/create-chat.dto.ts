import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({
    description: '消息内容',
  })
  content: string;

  @ApiProperty({
    description: '医生id',
  })
  doctor: string;

  @ApiProperty({
    description: '用户id',
  })
  user: string;
}

export interface OnLineDoctor {
  socketId?: string;
  doctorId?: string;
}

//  为了区分每一个提问的内容，把消息的type拼接为"医生id|用户id"的形式
export function getSocketTypeKey(info: CreateChatDto) {
  return info.user + '|' + info.doctor;
}
