import { Module } from '@nestjs/common';
import { DoctorTitlesService } from './doctor-titles.service';
import { DoctorTitlesController } from './doctor-titles.controller';

@Module({
  controllers: [DoctorTitlesController],
  providers: [DoctorTitlesService]
})
export class DoctorTitlesModule {}
