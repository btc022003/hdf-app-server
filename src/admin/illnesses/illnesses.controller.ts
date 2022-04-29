import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({
    summary: '获取单条记录',
  })
  @ApiParam({
    name: 'id',
  })
  @Get(':id')
  one(@Param() params) {
    return this.illnessesService.findOne(params.id, {
      illnessCategory: true,
      illnessMedicine: {
        include: {
          medicine: true, // 多层关联
        },
      },
    });
  }
}
