import { NestFactory } from '@nestjs/core';
import express from 'express';

import { HttpExceptionFilter } from '@shared/infra/http/filters/HttpException.filter';
import uploadConfig from '@config/upload';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use('/files', express.static(uploadConfig.uploadFolder));

  await app.listen(3333);
}
bootstrap();
