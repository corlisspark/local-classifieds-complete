// /Users/thiagotavares/Projects/Services/libs/shared/src/dto/index.ts
import { z } from 'zod';

// User DTOs
export const CreateUserDto = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

export const UpdateUserDto = z.object({
  email: z.string().email('Invalid email format').optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

export const UserParamsDto = z.object({
  id: z.string().cuid('Invalid user ID format'),
});

// Post DTOs
export const CreatePostDto = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().optional(),
  published: z.boolean().default(false),
  authorId: z.string().cuid('Invalid author ID format'),
});

export const UpdatePostDto = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title too long')
    .optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

export const PostParamsDto = z.object({
  id: z.string().cuid('Invalid post ID format'),
});

// Pagination DTOs
export const PaginationDto = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Category DTOs - Import from dedicated file
export * from './common.dto';

// Type exports
export type CreateUserDtoType = z.infer<typeof CreateUserDto>;
export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;
export type UserParamsDtoType = z.infer<typeof UserParamsDto>;
export type CreatePostDtoType = z.infer<typeof CreatePostDto>;
export type UpdatePostDtoType = z.infer<typeof UpdatePostDto>;
export type PostParamsDtoType = z.infer<typeof PostParamsDto>;
export type PaginationDtoType = z.infer<typeof PaginationDto>;
