import {
  Controller,
  Get,
  Param,
  Query,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
  // Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';

@ApiTags('后台-用户信息')
@Controller('admin/users')
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @ApiOperation({
    summary: '分页形式获取列表数据',
  })
  @ApiQuery({
    name: 'page',
    description: '页码',
    required: false,
    schema: {
      type: 'integer',
      default: 1,
    },
  })
  @ApiQuery({
    name: 'per',
    description: '每页显示的数量',
    required: false,
    schema: {
      type: 'integer',
      default: 10,
    },
  })
  @ApiQuery({
    name: 'name',
    description: '查询关键词，如果用name属性的时候使用',
    required: false,
    schema: {
      type: 'string',
      default: '',
    },
  })
  @Get()
  index(@Query() query) {
    const where: any = {};
    if (query.name) {
      // where.userName = { contains: query.name };
      where.OR = [
        {
          userName: { contains: query.name },
        },
        {
          nickName: { contains: query.name },
        },
      ];
    }

    return this.usersService.findAll(where, query.page, query.per);
  }

  @ApiOperation({
    summary: '根据用户id获取购物车信息',
  })
  @ApiParam({
    name: 'userId',
    // required: true,
    description: '用户id',
  })
  @Get('/carts/:userId')
  carts(@Param('userId') userId: string) {
    return this.usersService.findCartsInfoByUser(userId);
  }

  @ApiOperation({
    summary: '根据用户id获取收货地址信息',
  })
  @ApiParam({
    name: 'userId',
    // required: true,
    description: '用户id',
  })
  @Get('/addresses/:userId')
  addresses(@Param('userId') userId: string) {
    return this.usersService.findAddressesInfoByUser(userId);
  }

  // @ApiOperation({
  //   summary: '新增用户',
  // })
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @ApiOperation({
  //   summary: '获取用户信息',
  // })
  // @ApiQuery({
  //   name: 'userName',
  //   required: false,
  //   description: '用户名',
  // })
  // @ApiQuery({
  //   name: 'nickName',
  //   required: false,
  //   description: '昵称',
  // })
  // @Get()
  // findAll(@Query() query) {
  //   const where: any = {};
  //   if (query.userName) {
  //     where.userName = { contains: query.userName };
  //   }
  //   if (query.nickName) {
  //     where.nickName = { contains: query.nickName };
  //   }
  //   return this.usersService.findAll(where);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}
