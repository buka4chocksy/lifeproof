export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/v1';

export interface ApiHealth {
  status: 'ok' | 'degraded';
  service: string;
  version: string;
  timestamp: string;
  checks: {
    database: 'up' | 'down' | 'not_configured';
  };
}

export async function getApiHealth(): Promise<ApiHealth> {
  const response = await fetch(`${apiBaseUrl}/health`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`API health check failed with status ${response.status}`);
  }

  return (await response.json()) as ApiHealth;
}
