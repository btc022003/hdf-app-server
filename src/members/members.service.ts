import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateMemberDto,
  ModifyPWD,
  UserDoctorCollection,
  UserArticleCollection,
  UserCommentToDoctor,
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
  async modifyInfo(id: string, info: CreateMemberDto) {
    // console.log(info, id);
    await this.prisma.user.update({
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
        await this.prisma.user.update({
          where: { id },
          data: {
            password: encodePwd(info.password),
          },
        });
      } else {
        return {
          success: false,
          errorMessage: '原始密码输入错误',
        };
      }
    } else {
      return {
        success: false,
        errorMessage: '用户信息不存在',
      };
    }
    // this.prisma.user.update({});
  }

  /**
   * 加入或者删除文章收藏
   * @param info
   */
  async toggleArticleCollection(info: UserArticleCollection) {
    const count = await this.prisma.articleCollection.count({
      where: { userId: info.userId, articleId: info.articleId },
    });
    if (count > 0) {
      await this.prisma.articleCollection.deleteMany({
        where: { userId: info.userId, articleId: info.articleId },
      });
    } else {
      await this.prisma.articleCollection.create({
        data: {
          userId: info.userId,
          articleId: info.articleId,
        },
      });
    }
  }

  /**
   * 加入或者删除收藏
   * @param info
   */
  async toggleDoctorCollection(info: UserDoctorCollection) {
    const count = await this.prisma.doctorCollection.count({
      where: { userId: info.userId, doctorId: info.doctorId },
    });
    // 如果已经收藏过，那么删除，否则加入
    if (count > 0) {
      await this.prisma.doctorCollection.deleteMany({
        where: { userId: info.userId, doctorId: info.doctorId },
      });
    } else {
      await this.prisma.doctorCollection.create({
        data: {
          userId: info.userId,
          doctorId: info.doctorId,
        },
      });
    }
  }

  /**
   * 对医生进行评价
   * @param info
   */
  async commentDoctor(info: UserCommentToDoctor) {
    await this.prisma.doctorComment.create({
      data: {
        doctorId: info.doctorId,
        userId: info.userId,
        level: info.level,
        content: info.content,
        image: info.image,
      },
    });
  }
}
