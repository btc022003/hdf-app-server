import { ApiProperty } from '@nestjs/swagger';

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

export class UserCommentToDoctor {
  @ApiProperty({
    description: '用户id',
  })
  userId: string;

  @ApiProperty({
    description: '评论的医生id',
  })
  doctorId: string;

  @ApiProperty({
    description: '内容',
  })
  content: string;

  @ApiProperty({
    description: '评分',
  })
  level: number;

  @ApiProperty({
    description: '附件图片',
  })
  image?: string;
}
