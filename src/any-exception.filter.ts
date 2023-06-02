import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
// import { Prisma } from '@prisma/client';

// @Catch(Prisma.PrismaClientKnownRequestError)
@Catch(Error)
export class AnyExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AnyExceptionFilter.name); // 日志实例
  catch(exception: any, host: ArgumentsHost) {
    // console.log(exception);
    // console.log(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(exception); // 打印错误内容
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorMessage: exception?.message.split('\n').pop().trim(),
      data: exception.message,
      success: false,
    });
  }
}
