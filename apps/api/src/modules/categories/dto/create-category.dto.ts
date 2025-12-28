// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/dto/create-category.dto.ts

import { z } from 'zod';

export const CreateCategorySchema = z.object({
  slug: z.string().min(1).max(140),
  parentId: z.string().uuid().nullable().optional(),
  displayOrder: z.number().int().min(0).default(0),
  translations: z
    .array(
      z.object({
        language: z.string().min(2).max(5),
        name: z.string().min(1).max(120),
        description: z.string().max(500).optional(),
      }),
    )
    .min(1),
});

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
