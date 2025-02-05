import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/server/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ApiErrorMiddleware } from '@Shared/middlewares';
import { createDocumentFactory, validationPipeOpt } from '@Shared/config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeOpt));
  app.useGlobalFilters(new ApiErrorMiddleware());
  SwaggerModule.setup('doc', app, () => createDocumentFactory(app));
  await app.listen(3000);
}
bootstrap();
