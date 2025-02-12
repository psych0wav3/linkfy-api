import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/server/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ApiErrorMiddleware } from '@Shared/middlewares';
import { createDocumentFactory, validationPipeOpt } from '@Shared/config';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('NODE_SERVER_PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe(validationPipeOpt));
  app.useGlobalFilters(new ApiErrorMiddleware());
  SwaggerModule.setup('doc', app, () => createDocumentFactory(app));
  await app.listen(port);
}
bootstrap();
