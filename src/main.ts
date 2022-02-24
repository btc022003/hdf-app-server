import { NestFactory } from '@nestjs/core';
import { AllResponseInterceptor } from './all-response.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new AllResponseInterceptor()); // 拦截格式化处理所有的服务器响应

  await app.listen(3000);
}
bootstrap();
