import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IllnessesService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.illness, {
      illnessCategory: true,
    });
  }

  // 创建的时候,需要关联下药品表。多对多
  async create(data: CreateIllnessDto) {
    const { medicines, ...illnessData } = data;
    const illness = await this.prisma.illness.create({
      data: illnessData,
    });
    // 创建关联的药品信息
    //
    if (medicines && medicines.length > 0) {
      const illnessMedicines = medicines.map((item) => {
        return {
          medicineId: item,
          illnessId: illness.id,
        };
      });
      await this.prisma.illnessMedicine.createMany({
        data: illnessMedicines,
      });
      // 插入疾病和药品关联信息
    }

    return illness;
  }

  /**
   * 根据id修改一个
   * @param id
   * @param data
   * @returns
   */
  async update(id: string, data) {
    const { medicines, ...illnessData } = data;
    const illness = await this.prisma.illness.update({
      where: { id },
      data: illnessData,
    });
    if (medicines && medicines.length > 0) {
      // 删除已经存在的药品信息
      await this.prisma.illnessMedicine.deleteMany({
        where: {
          illnessId: id,
        },
      });
      // 根据传递的药品id数据进行存储
      const illnessMedicines = medicines.map((item) => {
        return {
          medicineId: item,
          illnessId: id,
        };
      });
      await this.prisma.illnessMedicine.createMany({
        data: illnessMedicines,
      });
    }
    return illness;
  }
}
