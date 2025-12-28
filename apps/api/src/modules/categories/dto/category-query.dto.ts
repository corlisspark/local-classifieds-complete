// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/dto/category-query.dto.ts

import { z } from 'zod';

export const CategoryQuerySchema = z.object({
  includeChildren: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
  includeInactive: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
  parentId: z.string().uuid().optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
  offset: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
});

export type CategoryQueryDto = z.infer<typeof CategoryQuerySchema>;
