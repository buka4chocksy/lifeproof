import type { IdentityPrincipal } from '@lifeproof/contracts';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { HttpRequest } from './http';

export const CurrentPrincipal = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): IdentityPrincipal | undefined =>
    ctx.switchToHttp().getRequest<HttpRequest>().principal,
);

export const RequestId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined =>
    ctx.switchToHttp().getRequest<HttpRequest>().requestId,
);
