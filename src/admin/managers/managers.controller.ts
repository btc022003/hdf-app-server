import { Controller, Post, Body, Patch, Param, Get, Req } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { BaseController } from 'src/base/base.controller';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('后台-管理员信息')
@Controller('admin/managers')
export class ManagersController extends BaseController {
  constructor(private readonly managersService: ManagersService) {
    super(managersService);
  }

  @ApiHeader({
    name: '新增',
    description: '数据新增',
  })
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @ApiHeader({
    name: '修改',
    description: '根据id修改一条数据记录',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @ApiHeader({
    name: '获取用户信息',
  })
  @Get('info')
  loadInfo(@Req() req) {
    return this.managersService.info(req.user.id);
  }

  @ApiHeader({
    name: '重新这是密码',
  })
  @Patch('reset_pwd/:id')
  resetPwd(
    @Param('id') id: string,
    @Body() updateManagerDto: UpdateManagerDto,
  ) {
    return this.managersService.resetPwd(id, updateManagerDto.password);
  }
}
