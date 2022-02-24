import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: '用户名',
  })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    description: '密码',
  })
  @IsNotEmpty({
    // message: '密码不能为空',
  })
  password: string;
}
