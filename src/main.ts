import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { AllResponseInterceptor } from './all-response.interceptor';
import { AppModule } from './app.module';
import { AnyExceptionFilter } from './any-exception.filter';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: ['error', 'warn'],
  });

  app.enableCors({ origin: true, credentials: true }); // 允许跨域和传递cookie

  const config = new DocumentBuilder()
    .setTitle('HDF')
    .setDescription('好大夫服务器端API接口')
    .setVersion('1.0')
    .addCookieAuth('token', {
      type: 'apiKey',
      in: 'cookie',
      description: '登录后获取的 token，存储在 cookie 中',
    })
    .addApiKey(
      { type: 'apiKey', in: 'header', name: 'token', description: '登录返回的 token' },
      'header-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // localhost:3000/docs 访问接口文档

  app.useGlobalInterceptors(new AllResponseInterceptor()); // 拦截格式化处理所有的服务器响应

  app.useGlobalPipes(new ValidationPipe()); // 使用验证插件

  app.use(cookieParser()); // cookie 格式化插件

  app.useGlobalFilters(new AnyExceptionFilter()); // 全局异常处理

  app.useStaticAssets('./public'); // 静态资源目录
  app.setBaseViewsDir('./src/views');
  app.setViewEngine('hbs');

  // 注册代码片段，在hbs模版中可以直接使用
  hbs.registerPartials('./src/views/partials', function (err) {
    if (err) console.log(err);
  });
  await app.listen(3006);
}
bootstrap();
