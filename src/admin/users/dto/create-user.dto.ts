import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
  })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    description: '密码',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: '昵称',
  })
  nickName: string;
}
