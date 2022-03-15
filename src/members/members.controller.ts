import { Controller, Get, Post, Body, Patch, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MembersService } from './members.service';
import {
  CreateMemberDto,
  ModifyPWD,
  UserArticleCollection,
  UserDoctorCollection,
  UserCommentToDoctor,
} from './dto/create-member.dto';

@ApiTags('会员中心')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @ApiOperation({
    summary: '获取用户信息',
  })
  @Get('info')
  info(@Req() req) {
    console.log(req.user);
    return this.membersService.info(req.user.id);
  }

  @ApiOperation({
    summary: '修改用户信息',
  })
  @Patch('update_info')
  update(@Req() req, @Body() updateMemberDto: CreateMemberDto) {
    return this.membersService.modifyInfo(req.user.id, updateMemberDto);
  }

  @ApiOperation({
    summary: '修改密码',
  })
  @Patch('modify_password')
  updatePWD(@Req() req, @Body() updateMemberDto: ModifyPWD) {
    return this.membersService.modifyPassword(req.user.id, updateMemberDto);
  }

  @ApiOperation({
    summary: '加入或者取消文章收藏',
  })
  @Post('article_collection')
  toggleArticleCollection(@Body() data: UserArticleCollection) {
    return this.membersService.toggleArticleCollection(data);
  }

  @ApiOperation({
    summary: '关注或者取消关注医生',
  })
  @Post('doctor_collection')
  toggleDoctorCollection(@Body() data: UserDoctorCollection) {
    return this.membersService.toggleDoctorCollection(data);
  }

  @ApiOperation({
    summary: '对医生做出评价打分',
  })
  @Post('comment_doctor')
  commentDOctor(@Body() data: UserCommentToDoctor) {
    //
    return '评论成功';
  }
}
