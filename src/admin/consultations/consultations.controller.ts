import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';

@ApiTags('后台-咨询数据')
@Controller('admin/consultations')
export class ConsultationsController extends BaseController {
  constructor(private readonly consultationsService: ConsultationsService) {
    super(consultationsService);
  }

  @Get()
  index(@Query() query) {
    return this.consultationsService.findAll({}, query.page, query.per, {
      user: true,
      doctor: true,
    });
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createConsultationDto: CreateConsultationDto) {
    return this.consultationsService.create(createConsultationDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return this.consultationsService.update(id, updateConsultationDto);
  }
}
