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
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('后台-角色信息')
@Controller('admin/roles')
export class RolesController extends BaseController {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService);
  }

  // 重写默认的分页方法，传递需要关联查询的数据
  @ApiHeader({
    name: '获取列表',
    description: '获取列表信息',
  })
  @Get()
  index(@Query() query) {
    return this.rolesService.findAll({}, query.page, query.per, {
      permissionOnRoles: true,
    });
  }

  @ApiHeader({
    name: '获取单条记录',
    description: '根据id获取单条记录',
  })
  @ApiParam({
    name: 'id',
  })
  @Get(':id')
  one(@Param() params) {
    console.log(params);
    return this.rolesService.findOne(params.id);
  }

  @ApiHeader({
    name: '新增',
    description: '数据新增',
  })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    // createRoleDto.permissions.split(',')
    return this.rolesService.create(createRoleDto);
  }

  @ApiHeader({
    name: '修改',
    description: '根据id修改一条数据记录',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }
}
