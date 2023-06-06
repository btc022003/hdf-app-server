import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
// import { encodePwd } from 'src/utils/tools';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService extends BaseService {
  constructor(private prisma: PrismaService) {
    super(prisma.user);
  }

  // /**
  //  * 创建一条记录
  //  * @param createUserDto
  //  * @returns
  //  */
  // create(createUserDto: CreateUserDto) {
  //   // return 'This action adds a new user';
  //   return this.prisma.user.create({
  //     data: {
  //       ...createUserDto,
  //       password: encodePwd(createUserDto.password),
  //     },
  //   });
  // }

  // /**
  //  * 统计数量
  //  * @returns
  //  */
  // count() {
  //   return this.prisma.user.count();
  // }

  // /**
  //  * 分页形式获取数据
  //  * @param where 查询条件
  //  * @param page  页码
  //  * @param per   每页显示的数量
  //  * @returns
  //  */
  // async findAll(where = {}, page = 1, per = 10) {
  //   page = isNaN(page) ? 1 : page * 1;
  //   per = isNaN(page) ? 10 : per * 1;
  //   const list = await this.prisma.user.findMany({
  //     where,
  //     skip: (page - 1) * per,
  //     take: per * 1,
  //   });
  //   const total = await this.prisma.user.count({ where });
  //   return {
  //     list,
  //     current: page,
  //     pageSize: per,
  //     total,
  //   };
  // }

  // /**
  //  * 根据id获取一条记录
  //  * @param id
  //  * @returns
  //  */
  // findOne(id: string) {
  //   return this.prisma.user.findUnique({
  //     where: { id },
  //     include: {
  //       doctorCollections: true, // 关注的医生
  //       articleCollections: true, // 收藏的文章
  //     },
  //   });
  // }

  // /**
  //  * 根据id修改记录
  //  * @param id
  //  * @param updateUserDto
  //  * @returns
  //  */
  // update(id: string, updateUserDto: UpdateUserDto) {
  //   delete updateUserDto.userName; // 删除用户名，限制用户名不能修改
  //   return this.prisma.user.update({
  //     where: { id },
  //     data: {
  //       ...updateUserDto,
  //       password: encodePwd(updateUserDto.password),
  //     },
  //   });
  // }

  // /**
  //  * 根据id删除一条记录
  //  * @param id
  //  * @returns
  //  */
  // remove(id: string) {
  //   return this.prisma.user.delete({ where: { id } });
  // }

  /**
   * 根据用户id获取用户的购物车数据
   * @param userId
   * @returns
   */
  findCartsInfoByUser(userId: string) {
    return this.prisma.shopCart.findMany({
      where: {
        userId,
      },
      include: {
        medicine: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * 根据用户id获取收货地址信息
   * @param userId
   * @returns
   */
  findAddressesInfoByUser(userId: string) {
    return this.prisma.address.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
