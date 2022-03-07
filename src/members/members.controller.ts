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
import { MembersService } from './members.service';
import {
  CreateMemberDto,
  ModifyPWD,
  UserArticleCollection,
  UserDoctorCollection,
} from './dto/create-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('info')
  info(@Req() req) {
    console.log(req.user);
    return this.membersService.info(req.user.id);
  }

  @Patch('update_info')
  update(@Req() req, @Body() updateMemberDto: CreateMemberDto) {
    return this.membersService.modifyInfo(req.user.id, updateMemberDto);
  }

  @Patch('modify_password')
  updatePWD(@Req() req, @Body() updateMemberDto: ModifyPWD) {
    return this.membersService.modifyPassword(req.user.id, updateMemberDto);
  }

  @Post('article_collection')
  toggleArticleCollection(@Body() createMemberDto: UserArticleCollection) {
    return this.membersService.toggleArticleCollection(createMemberDto);
  }

  @Post('article_doctor')
  toggleDoctorCollection(@Body() createMemberDto: UserDoctorCollection) {
    return this.membersService.toggleDoctorCollection(createMemberDto);
  }
}
