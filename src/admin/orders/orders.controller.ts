import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { BaseController } from 'src/base/base.controller';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('后台-订单管理')
@Controller('admin/orders')
export class OrdersController extends BaseController {
  constructor(private readonly ordersService: OrdersService) {
    super(ordersService);
  }

  @ApiOperation({
    summary: '根据用户ID获取所有订单',
  })
  @ApiParam({
    name: 'userId',
    description: '用户ID',
  })
  @Get('all/:userId')
  getAllOrdersByUserId(@Param('userId') userId: string) {
    return this.ordersService.findOrdersByUserId(userId);
  }
}
