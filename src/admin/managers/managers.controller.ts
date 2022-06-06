import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Req,
  Delete,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { BaseController } from 'src/base/base.controller';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('后台-管理员信息')
@Controller('admin/managers')
export class ManagersController extends BaseController {
  constructor(private readonly managersService: ManagersService) {
    super(managersService);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @ApiOperation({
    summary: '获取用户信息',
  })
  @Get('info')
  loadInfo(@Req() req) {
    return this.managersService.info(req.user.id);
  }

  @ApiOperation({
    summary: '重新设置密码',
  })
  @Patch('reset_pwd/:id')
  resetPwd(
    @Param('id') id: string,
    @Body() updateManagerDto: UpdateManagerDto,
  ) {
    return this.managersService.resetPwd(id, updateManagerDto.password);
  }

  @ApiOperation({
    summary: '删除',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.managersService.findOne(id);
    if (user.userName === 'admin') {
      return { success: false, errorMessage: '不能删除超级管理员' };
    }
    return this.managersService.remove(id);
  }
}
