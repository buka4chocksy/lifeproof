import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { HttpRequest } from '../common/http';
import { IdentityService } from './identity.service';

/**
 * Guard that resolves the dev identity and attaches it to the request. Controllers
 * must not bypass it; it is applied at the controller level so `/health` stays open.
 */
@Injectable()
export class IdentityGuard implements CanActivate {
  constructor(private readonly identity: IdentityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<HttpRequest>();
    const raw = request.headers['x-dev-user-id'];
    const userId = Array.isArray(raw) ? raw[0] : raw;
    request.principal = await this.identity.resolveDevPrincipal(userId);
    return true;
  }
}
