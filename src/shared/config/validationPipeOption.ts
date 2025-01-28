import { ValidationPipeOptions } from '@nestjs/common';

export const validationPipeOpt: ValidationPipeOptions = {
  transform: true,
  forbidNonWhitelisted: true,
  whitelist: true,
};
