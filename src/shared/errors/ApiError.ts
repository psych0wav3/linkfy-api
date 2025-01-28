import { HttpStatus } from '@nestjs/common';

export class ApiError extends Error {
  constructor(
    public statusCode: HttpStatus,
    public message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
