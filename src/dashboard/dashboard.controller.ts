import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { read, utils, write } from 'xlsx';
import { Response } from 'express';

@Controller('dashboard')
export class DashboardController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const workbook = read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]]; // 获取第一个sheet的数据
    const data = utils.sheet_to_json(sheet); // 数据转json
    // 取出来数据之后可以存在数据库中，做数据导入用
    return data;
  }

  @Get('export')
  load(
    @Res({ passthrough: true })
    response: Response,
  ) {
    // 组织数据
    const jsonWorkSheet = utils.json_to_sheet([
      {
        id: 1,
        name: 'Tom',
        age: 18,
      },
      {
        id: 2,
        name: 'Jerry',
        age: 18,
      },
    ]);
    const workBook = {
      SheetNames: ['Sheet0'],
      Sheets: {
        Sheet0: jsonWorkSheet,
      },
    };
    // 文件导出
    response.set('Content-disposition', 'attachment; filename=data.xlsx');
    response.send(
      write(workBook, {
        type: 'buffer',
      }),
    );
  }
}
