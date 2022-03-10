import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { BaseController } from 'src/base/base.controller';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('后台-权限信息')
@Controller('admin/permissions')
export class PermissionsController extends BaseController {
  constructor(private readonly permissionsService: PermissionsService) {
    super(permissionsService);
  }

  // 重写默认的分页方法，传递需要关联查询的数据
  @ApiOperation({
    summary: '获取列表',
  })
  @Get()
  index(@Query() query) {
    return this.permissionsService.findAll({}, query.page, query.per);
  }

  @ApiOperation({
    summary: '获取单条记录',
  })
  @ApiParam({
    name: 'id',
  })
  @Get(':id')
  one(@Param() params) {
    console.log(params);
    return this.permissionsService.findOne(params.id, {
      parent: true, // 关联父级信息
      role: true, // 获取角色信息
      permissions: true, // 关联所有的子集
    });
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }
}
