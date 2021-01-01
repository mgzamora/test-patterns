import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { QuoteAlreadyExistsError } from '../../../domain/quote-already-exists.error';

@Catch(QuoteAlreadyExistsError)
export class QuoteAlreadyExistsErrorFilter implements ExceptionFilter {
  catch(exception: QuoteAlreadyExistsError, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const status: HttpStatus = HttpStatus.CONFLICT;

    response.status(status).json({
      timestamp: new Date().toISOString(),
      name: exception.name,
      message: exception.message,
    });
  }
}
