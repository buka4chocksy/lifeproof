/**
 * Stable web-facing alias for the frozen workspace contract.
 *
 * The shared package is built to `packages/contracts/dist`; this module only
 * re-exports its types so the web app has no duplicated contract shapes.
 */
export type {
  ApiFieldError,
  ErrorEnvelope,
  Workspace,
  WorkspaceList,
  WorkspaceRegion,
  WorkspaceStatus,
  WorkspaceType,
} from '@lifeproof/contracts';
