import type { IdentityPrincipal, Workspace, WorkspaceList } from '@lifeproof/contracts';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentPrincipal, RequestId } from '../common/request.decorator';
import { IdentityGuard } from '../identity/identity.guard';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
@UseGuards(IdentityGuard)
export class WorkspacesController {
  constructor(private readonly workspaces: WorkspacesService) {}

  @Post()
  create(
    @CurrentPrincipal() principal: IdentityPrincipal,
    @Body() body: unknown,
    @RequestId() requestId: string,
  ): Promise<Workspace> {
    return this.workspaces.create(principal, body, requestId);
  }

  @Get()
  list(
    @CurrentPrincipal() principal: IdentityPrincipal,
    @Query() query: Record<string, unknown>,
  ): Promise<WorkspaceList> {
    return this.workspaces.list(principal, query);
  }

  @Get(':workspaceId')
  get(
    @CurrentPrincipal() principal: IdentityPrincipal,
    @Param('workspaceId') workspaceId: string,
  ): Promise<Workspace> {
    return this.workspaces.get(principal, workspaceId);
  }
}
