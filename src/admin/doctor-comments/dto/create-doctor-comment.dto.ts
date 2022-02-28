import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ApiTags('对医生的评价')
export class CreateDoctorCommentDto {
  @ApiProperty({
    description: '内容',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: '评分',
  })
  level: number;

  @ApiProperty({
    description: '图片',
  })
  image: string;

  @ApiProperty({
    description: '用户id',
  })
  userId: string;

  @ApiProperty({
    description: '医生id',
  })
  doctorId: string;
}
