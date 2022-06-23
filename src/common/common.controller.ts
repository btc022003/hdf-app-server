import {
  BadRequestException,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as multer from 'multer';
import * as path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file?.fieldname + '-' + uniqueSuffix + path.extname(file?.originalname),
    );
  },
});

@ApiTags('通用操作')
@Controller('common')
export class CommonController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  uploadFile(
    @UploadedFile()
    files,
  ) {
    if (files == undefined) {
      throw new BadRequestException('请选择需要上传的文件');
    } else {
      return '/uploads/' + files?.filename;
    }
  }

  @Post('upload_wang_editor')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  uploadFileWangRichEditor(
    @UploadedFile()
    files,
    @Res({ passthrough: false }) // false表示手动发送，不使用全局管道拦截
    response: Response,
  ) {
    if (files == undefined) {
      throw new BadRequestException('请选择需要上传的文件');
    } else {
      return response.json({
        errno: 0, // 注意：值是数字，不能是字符串
        data: {
          url: '/uploads/' + files?.filename, // 图片 src ，必须
          // alt: '图片', // 图片描述文字，非必须
          // href: 'zzz', // 图片的链接，非必须
        },
      });
    }
  }
}
