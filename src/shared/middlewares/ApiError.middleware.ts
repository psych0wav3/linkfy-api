import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ApiError } from '@Shared/errors';

@Catch(ApiError)
export class ApiErrorMiddleware implements ExceptionFilter {
  catch(exception: ApiError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(exception.statusCode || HttpStatus.BAD_REQUEST).json({
      code: exception.statusCode || HttpStatus.BAD_REQUEST,
      path: request.url,
      message: exception.message,
    });
  }
}
