import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    description: '地区信息',
  })
  region: string;

  @ApiProperty({
    description: '地区编码信息',
  })
  regionCode: string;

  @ApiProperty({
    description: '详细地址信息',
  })
  address: string;

  @ApiProperty({
    description: '是否默认',
    type: Boolean,
    default: false,
  })
  isDefault: boolean;

  @ApiProperty({
    description: '用户id',
  })
  userId: string;
}
