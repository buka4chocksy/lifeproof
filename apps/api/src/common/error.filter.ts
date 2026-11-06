import { randomUUID } from 'node:crypto';
import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiException, ErrorCode } from './api-error';
import type { HttpRequest, HttpResponse } from './http';

function statusToCode(status: number): string {
  switch (status) {
    case 400:
      return ErrorCode.BAD_REQUEST;
    case 401:
      return ErrorCode.AUTH_INVALID_CREDENTIALS;
    case 403:
      return ErrorCode.AUTH_FORBIDDEN;
    case 404:
      return ErrorCode.WORKSPACE_NOT_FOUND;
    default:
      return ErrorCode.INTERNAL_ERROR;
  }
}

/** Serialises every error to the standard `ErrorEnvelope` and echoes `X-Request-Id`. */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<HttpResponse>();
    const req = ctx.getRequest<HttpRequest>();

    let status = 500;
    let code: string = ErrorCode.INTERNAL_ERROR;
    let message = 'Unexpected error';
    let details: { field?: string; reason: string }[] | undefined;

    if (exception instanceof ApiException) {
      status = exception.statusCode;
      code = exception.code;
      message = exception.message;
      details = exception.details;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      code = statusToCode(status);
      const body = exception.getResponse();
      if (typeof body === 'object' && body !== null) {
        const msg = (body as { message?: string | string[] }).message;
        message = Array.isArray(msg) ? msg.join('; ') : (msg ?? exception.message);
      } else {
        message = String(body);
      }
    }

    const requestId = req.requestId ?? randomUUID();
    res.setHeader('x-request-id', requestId);
    res.status(status).json({
      error: {
        code,
        message,
        ...(details ? { details } : {}),
        request_id: requestId,
      },
    });
  }
}
