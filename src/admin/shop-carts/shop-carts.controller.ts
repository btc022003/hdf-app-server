import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ShopCartsService } from './shop-carts.service';
import { CreateShopCartDto } from './dto/create-shop-cart.dto';
import { UpdateShopCartDto } from './dto/update-shop-cart.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';

@ApiTags('后台-用户购物车')
@Controller('admin/shop_carts')
export class ShopCartsController extends BaseController {
  constructor(private readonly shopCartsService: ShopCartsService) {
    super(shopCartsService);
  }

  // @Post()
  // create(@Body() createShopCartDto: CreateShopCartDto) {
  //   return this.shopCartsService.create(createShopCartDto);
  // }

  @Get('user_carts')
  @ApiOperation({
    summary: '获取指定用户的购物车信息',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: '用户id',
  })
  findByUser(@Query() query) {
    return this.shopCartsService.findByUser(query.userId);
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.shopCartsService.remove(id);
  // }

  // @ApiOperation({
  //   summary: '删除多个购物车数据,多个用","分割',
  // })
  // @ApiQuery({
  //   name: 'id',
  //   required: false,
  //   description: '需要删除的购物车id,多个用","进行分割',
  // })
  // @Delete('remove_many')
  // remove(@Query('id') id: string) {
  //   return this.shopCartsService.removeMany(id.split(','));
  // }
}
