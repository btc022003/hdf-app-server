import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { AllResponseInterceptor } from './all-response.interceptor';
import { AppModule } from './app.module';
import { AnyExceptionFilter } from './any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('HDF')
    .setDescription('The cats API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // localhost:3000/docs 访问接口文档

  app.useGlobalInterceptors(new AllResponseInterceptor()); // 拦截格式化处理所有的服务器响应

  app.useGlobalPipes(new ValidationPipe()); // 使用验证插件

  app.use(cookieParser()); // cookie 格式化插件

  app.useGlobalFilters(new AnyExceptionFilter()); // 全局异常处理

  app.useStaticAssets('./public'); // 静态资源目录

  await app.listen(3000);
}
bootstrap();
