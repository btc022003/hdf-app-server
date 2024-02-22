import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { BaseController } from 'src/base/base.controller';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('后台-角色信息')
@Controller('admin/roles')
export class RolesController extends BaseController {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService);
  }

  // 重写默认的分页方法，传递需要关联查询的数据
  @ApiOperation({
    summary: '获取列表',
  })
  @Get()
  index(@Query() query) {
    return this.rolesService.findAll({}, query.page, query.per, {
      permissionOnRoles: {
        include: {
          permission: true,
        },
      },
    });
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
    return this.rolesService.findOne(params.id);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    // createRoleDto.permissions.split(',')
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }
}
