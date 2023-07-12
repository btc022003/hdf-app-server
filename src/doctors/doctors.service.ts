import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 获取医生信息
   * @param where
   * @param page
   * @param per
   * @returns
   */
  async doctors(where = {}, page = 1, per = 10) {
    // return this.prisma.doctor.findMany({
    //   where,
    //   orderBy: {
    //     id: 'desc',
    //   },
    //   skip: (page - 1) * per,
    //   take: per * 1,
    //   include: {
    //     departmentInfo: true,
    //     doctorTitleInfo: true,
    //   },
    // });
    page = isNaN(page) ? 1 : page * 1;
    per = isNaN(page) ? 10 : per * 1;
    const list = await this.prisma.doctor.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * per,
      take: per,
      include: {
        departmentInfo: true,
        doctorTitleInfo: true,
        hospitalInfo: true,
      },
    });
    const total = await this.prisma.doctor.count({ where });
    return {
      list,
      current: page,
      pageSize: per,
      total,
    };
  }

  /**
   * 获取部门信息
   * @returns
   */
  departments() {
    return this.prisma.department.findMany({
      where: {},
      orderBy: {
        id: 'desc',
      },
    });
  }

  /**
   * 获取医院信息
   * @returns
   */
  hospitals() {
    return this.prisma.hospital.findMany({
      where: {},
      orderBy: {
        id: 'desc',
      },
    });
  }

  /**
   * 根据id获取医院信息
   * @param id
   * @returns
   */
  hospitalById(id: string) {
    return this.prisma.hospital.findFirst({
      where: {
        id,
      },
    });
  }

  /**
   * 职称信息
   * @returns
   */
  titles() {
    return this.prisma.doctorTitle.findMany({
      where: {},
      orderBy: {
        id: 'desc',
      },
    });
  }

  /**
   * 标签信息
   * @returns
   */
  tags() {
    return this.prisma.doctorTag.findMany({
      where: {},
      orderBy: {
        id: 'desc',
      },
    });
  }

  /**
   * 一个医生信息
   * @param id
   * @returns
   */
  oneDoctor(id: string) {
    return this.prisma.doctor.findUnique({
      where: { id },
      include: {
        departmentInfo: true,
        doctorTitleInfo: true,
        hospitalInfo: true,
        doctorComments: {
          include: {
            userInfo: true,
          },
        },
      },
    });
  }
}
