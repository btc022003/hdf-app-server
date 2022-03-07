import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
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

  @ApiHeader({
    name: '新增',
    description: '数据新增',
  })
  @Post()
  create(@Body() createIllnessDto: CreateIllnessDto) {
    return this.illnessesService.create(createIllnessDto);
  }

  @ApiHeader({
    name: '修改',
    description: '根据id修改一条数据记录',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIllnessDto: UpdateIllnessDto) {
    return this.illnessesService.update(id, updateIllnessDto);
  }
}
