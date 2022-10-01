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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('收货地址')
@Controller('members/addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @ApiOperation({
    summary: '创建收货地址数据',
  })
  @Post()
  create(@Req() req, @Body() createAddressDto: CreateAddressDto) {
    delete createAddressDto.userId; // 剔除userId
    return this.addressesService.create(createAddressDto, req.user.id);
  }

  @ApiOperation({
    summary: '获取收货地址信息',
  })
  @Get()
  findAll(@Req() req) {
    return this.addressesService.findAll(req.user.id);
  }

  @ApiOperation({
    summary: '查询单个数据',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @ApiOperation({
    summary: '修改收货地址',
  })
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    delete updateAddressDto.userId; // 剔除userId
    return this.addressesService.update(id, updateAddressDto, req.user.id);
  }

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
    return this.addressesService.remove(id.split(','));
  }
}
