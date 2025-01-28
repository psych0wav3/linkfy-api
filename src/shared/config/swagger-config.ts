import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Linkfy API')
  .setDescription('The linkfy API from client-side')
  .setVersion('1.0.0')
  .addSecurity('bearer', { type: 'http', scheme: 'bearer' })
  .build();

export const createDocumentFactory = (app: INestApplication) =>
  SwaggerModule.createDocument(app, swaggerConfig);
