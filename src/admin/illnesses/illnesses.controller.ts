import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IllnessesService } from './illnesses.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';
import { BaseController } from 'src/base/base.controller';

@ApiTags('后台-疾病信息')
@Controller('admin/illnesses')
export class IllnessesController extends BaseController {
  constructor(private readonly illnessesService: IllnessesService) {
    super(illnessesService);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createIllnessDto: CreateIllnessDto) {
    return this.illnessesService.create(createIllnessDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIllnessDto: UpdateIllnessDto) {
    return this.illnessesService.update(id, updateIllnessDto);
  }
}
