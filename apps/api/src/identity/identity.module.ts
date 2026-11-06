import { Module } from '@nestjs/common';
import { IdentityGuard } from './identity.guard';
import { IdentityService } from './identity.service';

@Module({
  providers: [IdentityService, IdentityGuard],
  exports: [IdentityService, IdentityGuard],
})
export class IdentityModule {}
