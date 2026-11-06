import { z } from 'zod';

export const healthCheckSchema = z.object({
  status: z.enum(['ok', 'degraded']),
  service: z.string(),
  version: z.string(),
  timestamp: z.string().datetime(),
  checks: z.object({
    database: z.enum(['up', 'down', 'not_configured']),
  }),
});

export type HealthCheck = z.infer<typeof healthCheckSchema>;

export const apiFieldErrorSchema = z.object({
  field: z.string().optional(),
  reason: z.string(),
});

export type ApiFieldError = z.infer<typeof apiFieldErrorSchema>;

export const errorEnvelopeSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.array(apiFieldErrorSchema).optional(),
    request_id: z.string(),
  }),
});

export type ErrorEnvelope = z.infer<typeof errorEnvelopeSchema>;
