import { Injectable } from '@nestjs/common';
import { CreateNursingWorkerDto } from './dto/create-nursing-worker.dto';
import { UpdateNursingWorkerDto } from './dto/update-nursing-worker.dto';

@Injectable()
export class NursingWorkersService {
  create(createNursingWorkerDto: CreateNursingWorkerDto) {
    return 'This action adds a new nursingWorker';
  }

  findAll() {
    return `This action returns all nursingWorkers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nursingWorker`;
  }

  update(id: number, updateNursingWorkerDto: UpdateNursingWorkerDto) {
    return `This action updates a #${id} nursingWorker`;
  }

  remove(id: number) {
    return `This action removes a #${id} nursingWorker`;
  }
}
