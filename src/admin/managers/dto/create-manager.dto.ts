import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateManagerDto {
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
    description: '头像',
  })
  avatar: string;

  @ApiProperty({
    description: '昵称',
  })
  nickName: string;

  @ApiProperty({
    description: '角色',
  })
  roleId: string;
}
