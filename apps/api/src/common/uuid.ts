import { z } from 'zod';

const uuidSchema = z.string().uuid();

export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && uuidSchema.safeParse(value).success;
}
