import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.role, {
      permissionOnRoles: true,
    });
  }

  async create(data: CreateRoleDto) {
    const dataRole = { ...data };
    delete dataRole.permissions;
    const role = await this.prisma.role.create({ data: dataRole });
    const pOnRole = data.permissions.split(',').map((item) => {
      return {
        roleId: role.id,
        permissionId: item,
      };
    });

    if (pOnRole.length > 0) {
      // 删除原有的
      await this.prisma.permissionsOnRoles.deleteMany({
        where: {
          roleId: role.id,
        },
      });
      // 加入新的
      await this.prisma.permissionsOnRoles.createMany({
        data: pOnRole,
      });
    }
    return role;
  }

  async update(id: string, data: UpdateRoleDto) {
    // const role = await this.prisma.role.findUnique({
    //   where: { id },
    // });
    const dataRole = { ...data };
    delete dataRole.permissions;
    const role = await this.prisma.role.update({
      where: { id },
      data: dataRole,
    });
    const pOnRole = data.permissions.split(',').map((item) => {
      return {
        roleId: role.id,
        permissionId: item,
      };
    });

    if (pOnRole.length > 0) {
      // 删除原有的
      await this.prisma.permissionsOnRoles.deleteMany({
        where: {
          roleId: role.id,
        },
      });
      // 加入新的
      await this.prisma.permissionsOnRoles.createMany({
        data: pOnRole,
      });
    }
    return role;
  }
}
