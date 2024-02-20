import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { encodePwd } from 'src/utils/tools';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagersService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.manager, { role: true });
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
    // console.log(id, updateManagerDto);
    return this.model.update({
      where: { id },
      data: {
        ...updateManagerDto,
        // updateManagerDto.password?password: encodePwd(updateManagerDto.password),
      },
    });
  }

  /**
   * 获取用户信息
   * @param id
   * @returns
   */
  async info(id: string) {
    const user = await this.prisma.manager.findUnique({
      where: { id },
      include: { role: true },
    });
    // console.log(user.roleId);
    const permissions = await this.prisma.permissionsOnRoles.findMany({
      where: { roleId: user.roleId },
      include: {
        permission: true,
      },
    });
    return { ...user, permissions };
  }

  /**
   * 重置密码
   * @param id
   * @param password
   * @returns
   */
  resetPwd(id, password) {
    return this.model.update({
      where: { id },
      data: {
        password: encodePwd(password),
      },
    });
  }

  /**
   * 根据id删除多个，多个id用,分割
   * @param ids
   * @returns
   */
  removeMany(ids: string[]) {
    // console.log(ids);
    return this.model.deleteMany({
      where: {
        id: {
          in: ids,
        },
        userName: {
          not: 'admin',
        },
      },
    });
  }
}
