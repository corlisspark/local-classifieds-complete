// /Users/thiagotavares/Projects/Services/apps/api/libs/shared/src/dto/common.dto.ts

import { z } from 'zod';

// Common pagination DTO
export const PaginationDto = z.object({
  limit: z.coerce
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit cannot exceed 100')
    .default(20),
  offset: z.coerce
    .number()
    .int()
    .min(0, 'Offset cannot be negative')
    .default(0),
});

// Common sort DTO
export const SortDto = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// Common search DTO
export const SearchDto = z.object({
  query: z
    .string()
    .min(1, 'Search query cannot be empty')
    .max(100, 'Search query too long'),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

// Common ID parameter DTO
export const IdParamDto = z.object({
  id: z.string().uuid('Invalid ID format'),
});

// Common response wrapper
export const ApiResponseDto = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
});

// Common error response
export const ErrorResponseDto = z.object({
  success: z.literal(false),
  message: z.string(),
  error: z.string(),
  statusCode: z.number(),
  timestamp: z.string(),
  path: z.string(),
});

// Type exports
export type PaginationDtoType = z.infer<typeof PaginationDto>;
export type SortDtoType = z.infer<typeof SortDto>;
export type SearchDtoType = z.infer<typeof SearchDto>;
export type IdParamDtoType = z.infer<typeof IdParamDto>;
export type ApiResponseDtoType = z.infer<typeof ApiResponseDto>;
export type ErrorResponseDtoType = z.infer<typeof ErrorResponseDto>;
