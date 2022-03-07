import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';

@Injectable()
export class IllnessesService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.illness, {
      illnessCategory: true,
    });
  }
}
