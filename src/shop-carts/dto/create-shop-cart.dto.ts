import { ApiProperty } from '@nestjs/swagger';

export class CreateShopCartDto {
  // @ApiProperty({
  //   description: '用户id',
  //   required: true,
  // })
  // user: string;

  @ApiProperty({
    description: '商品数量',
    required: true,
    default: 1,
  })
  amount: number;

  @ApiProperty({
    description: '商品id',
    required: true,
  })
  medicine: string;

  @ApiProperty({
    description: '商品价格',
    required: true,
    default: 1,
  })
  price: number;
}

export class QueryInfo {
  page?: number;
  per?: number;
}
