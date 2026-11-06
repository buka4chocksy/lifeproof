import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { CreateWorkspaceForm } from '@/components/create-workspace-form';

export const metadata: Metadata = {
  title: 'Create your safe',
};

export default function NewWorkspacePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <AppHeader />
      <main id="main" className="mx-auto w-full max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <CreateWorkspaceForm />
      </main>
    </div>
  );
}
