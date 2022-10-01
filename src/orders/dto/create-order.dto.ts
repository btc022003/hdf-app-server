import { ApiProperty } from '@nestjs/swagger';

export class orderDetail {
  price: number;
  medicine: string;
  amount: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: '地区信息',
  })
  region: string;

  @ApiProperty({
    description: '地区编码',
  })
  regionCode: string;

  @ApiProperty({
    description: '详细地址信息',
  })
  address: string;

  @ApiProperty({
    description: '订单详情,一个订单可以包含多个商品',
    type: [orderDetail],
  })
  orderDetails: orderDetail[];

  isEnd: boolean;
  status: number;
  isPayed: boolean;
  price: 0;
  expressInfo: string;
  userId: string;
}

export class QueryInfo {
  page?: number;
  per?: number;
  @ApiProperty({
    description: '状态数据,-1表示所有',
    default: -1,
  })
  status?: number;
  @ApiProperty({
    description: '是否完成,0表示未完成,1表示已完成,-1表示所有',
    default: -1,
  })
  end?: number;
  @ApiProperty({
    description: '是否支付,0表示未支付,1表示已支付,-1表示所有',
    default: -1,
  })
  payed?: number;
}
