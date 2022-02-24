import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
      return files?.filename;
    }
  }
}
