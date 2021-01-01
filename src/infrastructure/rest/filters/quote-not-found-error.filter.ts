import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { QuoteNotFoundError } from '../../../domain/quote-not-found.error';

@Catch(QuoteNotFoundError)
export class QuoteNotFoundErrorFilter implements ExceptionFilter {
  catch(exception: QuoteNotFoundError, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const status: HttpStatus = HttpStatus.NOT_FOUND;

    response.status(status).json({
      timestamp: new Date().toISOString(),
      name: exception.name,
      message: exception.message,
    });
  }
}
