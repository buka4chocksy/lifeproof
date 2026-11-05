import { Test } from '@nestjs/testing';
import { describe, expect, it, vi } from 'vitest';
import { HealthController } from './health.controller';
import { type HealthCheckResult, HealthService } from './health.service';

const result: HealthCheckResult = {
  status: 'ok',
  service: 'lifeproof-api',
  version: '0.1.0',
  timestamp: '2026-11-05T00:00:00.000Z',
  checks: { database: 'up' },
};

describe('HealthController', () => {
  it('returns the health service result', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: { check: vi.fn().mockResolvedValue(result) },
        },
      ],
    }).compile();

    const controller = moduleRef.get(HealthController);
    await expect(controller.check()).resolves.toEqual(result);
  });
});
