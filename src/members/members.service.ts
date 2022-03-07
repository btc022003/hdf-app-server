import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateMemberDto,
  ModifyPWD,
  UserDoctorCollection,
  UserArticleCollection,
} from './dto/create-member.dto';
import { encodePwd } from 'src/utils/tools';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 获取用户信息
   * @param id
   * @returns
   */
  info(id: string) {
    return this.prisma.user.findFirst({
      where: { id },
      include: {
        consultations: true, // 咨询
        doctorCollections: true, // 关注的医生
        articleCollections: true, // 收藏的文章
        doctorComments: true, // 评论
      },
    });
  }

  /**
   * 修改个人信息
   * @param id
   * @param info
   */
  modifyInfo(id: string, info: CreateMemberDto) {
    this.prisma.user.update({
      where: { id },
      data: info,
    });
  }

  /**
   * 修改密码
   * @param id
   * @param info
   */
  async modifyPassword(id: string, info: ModifyPWD) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (user) {
      if (user.password == encodePwd(info.oldPassword)) {
        this.prisma.user.update({
          where: { id },
          data: {
            password: info.password,
          },
        });
      }
    }
    // this.prisma.user.update({});
  }

  /**
   * 加入或者删除文章收藏
   * @param info
   */
  async toggleArticleCollection(info: UserArticleCollection) {
    await this.prisma.articleCollection.deleteMany({
      where: { userId: info.userId, articleId: info.articleId },
    });
    await this.prisma.articleCollection.create({
      data: {
        userId: info.userId,
        articleId: info.articleId,
      },
    });
  }

  /**
   * 加入或者删除收藏
   * @param info
   */
  async toggleDoctorCollection(info: UserDoctorCollection) {
    await this.prisma.doctorCollection.deleteMany({
      where: { userId: info.userId, doctorId: info.doctorId },
    });
    await this.prisma.doctorCollection.create({
      data: {
        userId: info.userId,
        doctorId: info.doctorId,
      },
    });
  }
}
