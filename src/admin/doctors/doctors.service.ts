import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorsService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.doctor);
  }
}

// @Injectable()
// export class DoctorsService {
//   constructor(private prisma: PrismaService) {}

//   /**
//    * 新增一条记录
//    * @param createDoctorDto
//    * @returns
//    */
//   create(createDoctorDto: CreateDoctorDto) {
//     return this.prisma.doctor.create({
//       data: createDoctorDto,
//     });
//   }

//   /**
//    * 统计数量
//    * @returns
//    */
//   count() {
//     return this.prisma.doctor.count();
//   }

//   /**
//    * 分页形式获取数据
//    * @param where 查询条件
//    * @param page  页码
//    * @param per   每页显示的数量
//    * @returns
//    */
//   async findAll(where = {}, page = 1, per = 10) {
//     page = isNaN(page) ? 1 : page * 1;
//     per = isNaN(page) ? 10 : per * 1;
//     const list = await this.prisma.doctor.findMany({
//       where,
//       skip: (page - 1) * per,
//       take: per * 1,
//       include: {
//         departmentInfo: true,
//       },
//     });
//     const total = await this.prisma.doctor.count({ where });
//     return {
//       list,
//       current: page,
//       pageSize: per,
//       total,
//     };
//   }

//   /**
//    * 根据id获取一条记录
//    * @param id
//    * @returns
//    */
//   findOne(id: string) {
//     return this.prisma.doctor.findUnique({ where: { id } });
//   }

//   /**
//    * 根据id修改记录
//    * @param id
//    * @param updateDoctorDto
//    * @returns
//    */
//   update(id: string, updateDoctorDto: UpdateDoctorDto) {
//     return this.prisma.doctor.update({
//       where: { id },
//       data: updateDoctorDto,
//     });
//   }

//   /**
//    * 根据id删除一条记录
//    * @param id
//    * @returns
//    */
//   remove(id: string) {
//     return this.prisma.doctor.delete({ where: { id } });
//   }
// }
