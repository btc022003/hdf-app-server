import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({
    description: '昵称',
  })
  nickName: string;

  @ApiProperty({
    description: '头像',
  })
  avatar: string;

  @ApiProperty({
    description: '手机号',
  })
  mobile: string;

  @ApiProperty({
    description: '地址',
  })
  address: string;
}

export class ModifyPWD {
  @ApiProperty({
    description: '原始密码',
  })
  oldPassword: string;

  @ApiProperty({
    description: '新密码',
  })
  password: string;
}

export class UserArticleCollection {
  @ApiProperty({
    description: '用户id',
  })
  userId: string;

  @ApiProperty({
    description: '文章id',
  })
  articleId: string;
}

export class UserDoctorCollection {
  @ApiProperty({
    description: '用户id',
  })
  userId: string;

  @ApiProperty({
    description: '医生id',
  })
  doctorId: string;
}
