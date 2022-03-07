import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { MembersService } from './members.service';
import {
  CreateMemberDto,
  ModifyPWD,
  UserArticleCollection,
  UserDoctorCollection,
} from './dto/create-member.dto';

@ApiTags('会员中心')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @ApiHeader({
    name: '获取用户信息',
  })
  @Get('info')
  info(@Req() req) {
    console.log(req.user);
    return this.membersService.info(req.user.id);
  }

  @ApiHeader({
    name: '修改用户信息',
  })
  @Patch('update_info')
  update(@Req() req, @Body() updateMemberDto: CreateMemberDto) {
    return this.membersService.modifyInfo(req.user.id, updateMemberDto);
  }

  @ApiHeader({
    name: '修改密码',
  })
  @Patch('modify_password')
  updatePWD(@Req() req, @Body() updateMemberDto: ModifyPWD) {
    return this.membersService.modifyPassword(req.user.id, updateMemberDto);
  }

  @ApiHeader({
    name: '加入或者取消文章收藏',
  })
  @Post('article_collection')
  toggleArticleCollection(@Body() createMemberDto: UserArticleCollection) {
    return this.membersService.toggleArticleCollection(createMemberDto);
  }

  @ApiHeader({
    name: '关注或者取消关注医生',
  })
  toggleDoctorCollection(@Body() createMemberDto: UserDoctorCollection) {
    return this.membersService.toggleDoctorCollection(createMemberDto);
  }
}
