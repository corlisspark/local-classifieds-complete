// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/dto/update-category.dto.ts

import { z } from 'zod';

export const UpdateCategorySchema = z.object({
  slug: z.string().min(1).max(140).optional(),
  parentId: z.string().uuid().nullable().optional(),
  displayOrder: z.number().int().min(0).optional(),
  active: z.boolean().optional(),
  translations: z
    .array(
      z.object({
        language: z.string().min(2).max(5),
        name: z.string().min(1).max(120),
        description: z.string().max(500).optional(),
      }),
    )
    .optional(),
});

export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
