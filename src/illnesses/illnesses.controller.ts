import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { IllnessesService } from './illnesses.service';
import { QueryInfo } from './dto/create-illness.dto';
// import { UpdateIllnessDto } from './dto/update-illness.dto';

@ApiTags('疾病部分')
@Controller('illnesses')
export class IllnessesController {
  constructor(private readonly illnessesService: IllnessesService) {}

  @ApiQuery({
    name: 'keyword',
    description: '查询关键词',
    schema: {
      type: 'string',
      default: '',
    },
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: '页码',
    required: false,
    schema: {
      type: 'integer',
      default: 1,
    },
  })
  @ApiQuery({
    name: 'per',
    description: '每页显示的数量',
    required: false,
    schema: {
      type: 'integer',
      default: 10,
    },
  })
  @ApiOperation({
    summary: '获取药品信息列表',
  })
  @Get()
  findAll(@Query() params: QueryInfo) {
    return this.illnessesService.findIllnesses(
      params.keyword,
      params.page,
      params.per,
    );
  }

  @ApiOperation({
    summary: '获取疾病分类',
  })
  @Get('categories')
  findCategories() {
    return this.illnessesService.findIllnessCategories();
  }

  @ApiOperation({
    summary: '常见疾病',
  })
  @Get('standing_medicines')
  standingData() {
    return this.illnessesService.findStandingIllnesses();
  }

  @ApiOperation({
    summary: '疾病详情',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.illnessesService.findIllness(id);
  }
}
