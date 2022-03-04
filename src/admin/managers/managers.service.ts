import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { encodePwd } from 'src/utils/tools';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagersService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.manager);
  }

  /**
   * 新增一条记录
   * @param data
   * @returns
   */
  create(createManagerDto: CreateManagerDto) {
    return this.model.create({
      data: {
        ...createManagerDto,
        password: encodePwd(createManagerDto.password),
      },
    });
  }

  /**
   * 修改用户信息，删除用户名的修改
   * @param id
   * @param updateManagerDto
   * @returns
   */
  update(id: string, updateManagerDto: UpdateManagerDto) {
    delete updateManagerDto.userName; // 删除用户名，限制用户名不能修改
    delete updateManagerDto.password;
    console.log(id, updateManagerDto);
    return this.model.update({
      where: { id },
      data: {
        ...updateManagerDto,
        // updateManagerDto.password?password: encodePwd(updateManagerDto.password),
      },
    });
  }
}
