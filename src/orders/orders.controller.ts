import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  Req,
  Query,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, QueryInfo } from './dto/create-order.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
// import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('订单')
@Controller('members/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto, req.user.id);
  }

  @ApiOperation({
    summary: '获取订单数据',
  })
  @Get()
  findAll(@Req() req, @Query() params: QueryInfo) {
    return this.ordersService.findOrders(
      req.user.id,
      params.status,
      params.payed,
      params.end,
      params.page,
      params.per,
    );
  }

  @ApiOperation({
    summary: '获取订单详情',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  @ApiOperation({
    summary: '删除多个订单,多个用","分割',
  })
  @ApiQuery({
    name: 'id',
    required: false,
    description: '需要删除的订单id,多个用","进行分割',
  })
  @Delete()
  remove(@Query('id') id: string) {
    return this.ordersService.remove(id.split(','));
  }
}
