import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { DoctorCommentsService } from './doctor-comments.service';
import { CreateDoctorCommentDto } from './dto/create-doctor-comment.dto';
import { UpdateDoctorCommentDto } from './dto/update-doctor-comment.dto';

@ApiTags('后台-对医生的评价')
@Controller('admin/doctor_comments')
export class DoctorCommentsController extends BaseController {
  constructor(private readonly doctorCommentsService: DoctorCommentsService) {
    super(doctorCommentsService);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createDoctorCommentDto: CreateDoctorCommentDto) {
    return this.doctorCommentsService.create(createDoctorCommentDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorCommentDto: UpdateDoctorCommentDto,
  ) {
    return this.doctorCommentsService.update(id, updateDoctorCommentDto);
  }
}
