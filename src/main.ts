import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptor/response-interceptor';
import {ResponseExceptionFilter} from './filters/response-exception.filter'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  //异常拦截
  app.useGlobalFilters(new ResponseExceptionFilter());
  
  //全局管道
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
