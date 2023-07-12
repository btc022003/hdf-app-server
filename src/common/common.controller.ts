import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
// 验证码部分暂时先注释掉，需要使用自己fork的一个库
// https://github.com/btc022003/svg-captcha
// import * as svgCaptcha from 'svg-captcha';

// 如果上传目录不存在，那么自行创建
if (!fs.existsSync('./public/uploads')) {
  fs.mkdirSync('./public/uploads');
}

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

  /*
  @ApiOperation({
    summary: '生成验证码,直接返回图片。数据存储在cookie的captcha中',
  })
  @ApiQuery({
    name: 'captcha',
    description: '验证码的值',
    required: false,
    schema: {
      type: 'string',
      default: 10,
    },
  })
  @Get('captcha')
  captcha(
    @Res({ passthrough: false })
    response: Response,
    @Query() params,
  ) {
    //

    const captcha = svgCaptcha.createCaptcha(params.captcha);
    // console.log(captcha.text);
    response.cookie('captcha', params.captcha, {
      // httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    response.type('svg');
    response.status(200).send(captcha);
  }
  */
}
