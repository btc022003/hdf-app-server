import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicinesService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.medicine);
  }

  // 创建的时候,需要关联下药品表。多对多
  async create(data: CreateMedicineDto) {
    const { illnesses, ...medicineData } = data;
    const medicine = await this.prisma.medicine.create({
      data: medicineData,
    });
    // 创建关联的药品信息
    //
    if (illnesses && illnesses.length > 0) {
      const illnessMedicines = illnesses.map((item) => {
        return {
          medicineId: medicine.id,
          illnessId: item,
        };
      });
      await this.prisma.illnessMedicine.createMany({
        data: illnessMedicines,
      });
      // 插入疾病和药品关联信息
    }

    return medicine;
  }

  /**
   * 根据id修改一个
   * @param id
   * @param data
   * @returns
   */
  async update(id: string, data: UpdateMedicineDto) {
    const { illnesses, ...medicineData } = data;
    const medicine = await this.prisma.illness.update({
      where: { id },
      data: medicineData,
    });
    if (illnesses && illnesses.length > 0) {
      // 删除已经存在的药品信息
      await this.prisma.illnessMedicine.deleteMany({
        where: {
          medicineId: id,
        },
      });
      // 根据传递的药品id数据进行存储
      const illnessMedicines = illnesses.map((item) => {
        return {
          medicineId: id,
          illnessId: item,
        };
      });
      await this.prisma.illnessMedicine.createMany({
        data: illnessMedicines,
      });
    }
    return medicine;
  }
}
