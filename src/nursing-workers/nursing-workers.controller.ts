import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NursingWorkersService } from './nursing-workers.service';
import {
  AskWork,
  CreateNursingWorkerDto,
} from './dto/create-nursing-worker.dto';
import { UpdateNursingWorkerDto } from './dto/update-nursing-worker.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('护工和陪诊相关')
@Controller('nursing-workers')
export class NursingWorkersController {
  constructor(private readonly nursingWorkersService: NursingWorkersService) {}

  @ApiOperation({
    summary: '申请入驻',
  })
  @Post('ask')
  create(@Body() createNursingWorkerDto: AskWork) {
    return this.nursingWorkersService.create(createNursingWorkerDto);
  }

  @Get()
  findAll() {
    return this.nursingWorkersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nursingWorkersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNursingWorkerDto: UpdateNursingWorkerDto,
  ) {
    return this.nursingWorkersService.update(+id, updateNursingWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nursingWorkersService.remove(+id);
  }
}
