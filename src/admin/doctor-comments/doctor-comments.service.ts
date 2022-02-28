import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorCommentsService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.doctorComment);
  }
}
