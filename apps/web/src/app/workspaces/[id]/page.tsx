import type { Metadata } from 'next';
import { WorkspaceDashboard } from '@/components/workspace-dashboard';

export const metadata: Metadata = {
  title: 'Your safe',
};

interface WorkspacePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string | string[] }>;
}

export default async function WorkspacePage({ params, searchParams }: WorkspacePageProps) {
  const { id } = await params;
  const query = await searchParams;
  const created = Array.isArray(query.created) ? query.created[0] : query.created;

  return <WorkspaceDashboard workspaceId={id} showCreated={created === '1'} />;
}
