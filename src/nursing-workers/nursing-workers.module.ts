import { Module } from '@nestjs/common';
import { NursingWorkersService } from './nursing-workers.service';
import { NursingWorkersController } from './nursing-workers.controller';

@Module({
  controllers: [NursingWorkersController],
  providers: [NursingWorkersService]
})
export class NursingWorkersModule {}
