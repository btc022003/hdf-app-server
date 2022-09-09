import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ShopCartsService } from './shop-carts.service';
import { CreateShopCartDto, QueryInfo } from './dto/create-shop-cart.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('购物车')
@Controller('members/shop_carts')
export class ShopCartsController {
  constructor(private readonly shopCartsService: ShopCartsService) {}

  @ApiOperation({
    summary: '加入购物车',
  })
  @Post()
  create(@Req() req, @Body() createShopCartDto: CreateShopCartDto) {
    // 加入购物车
    return this.shopCartsService.create(createShopCartDto, req.user.id);
  }

  @ApiOperation({
    summary: '获取购物车数据',
  })
  @Get()
  findAll(@Req() req, @Query() params: QueryInfo) {
    return this.shopCartsService.findCarts(
      req.user.id,
      params.page,
      params.per,
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.shopCartsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateShopCartDto: UpdateShopCartDto,
  // ) {
  //   return this.shopCartsService.update(+id, updateShopCartDto);
  // }

  @ApiOperation({
    summary: '删除购物车数据',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopCartsService.remove(id);
  }
}
