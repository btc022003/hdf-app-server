import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllResponseInterceptor } from './all-response.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // localhost:3000/docs 访问接口文档

  app.useGlobalInterceptors(new AllResponseInterceptor()); // 拦截格式化处理所有的服务器响应

  app.useGlobalPipes(new ValidationPipe()); // 使用验证插件

  await app.listen(3000);
}
bootstrap();
