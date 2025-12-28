// /Users/thiagotavares/Projects/Services/libs/shared/src/dto/common.dto.ts

import { z } from 'zod';

// Common pagination DTO
export const PaginationDto = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  offset: z.number().int().min(0).optional(),
});

export type PaginationDtoType = z.infer<typeof PaginationDto>;

// Common sorting DTO
export const SortDto = z.object({
  field: z.string().min(1),
  direction: z.enum(['asc', 'desc']).default('asc'),
});

export type SortDtoType = z.infer<typeof SortDto>;

// Common search DTO
export const SearchDto = z.object({
  query: z.string().min(1).max(255),
  fields: z.array(z.string()).optional(),
});

export type SearchDtoType = z.infer<typeof SearchDto>;

// Common date range DTO
export const DateRangeDto = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type DateRangeDtoType = z.infer<typeof DateRangeDto>;

// Common response DTO
export const ApiResponseDto = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
  timestamp: z.date().default(() => new Date()),
});

export type ApiResponseDtoType = z.infer<typeof ApiResponseDto>;

// Common error DTO
export const ApiErrorDto = z.object({
  success: z.literal(false),
  message: z.string(),
  error: z.string(),
  statusCode: z.number().int(),
  timestamp: z.date().default(() => new Date()),
  path: z.string().optional(),
});

export type ApiErrorDtoType = z.infer<typeof ApiErrorDto>;

// Common validation error DTO
export const ValidationErrorDto = z.object({
  field: z.string(),
  message: z.string(),
  value: z.any().optional(),
});

export type ValidationErrorDtoType = z.infer<typeof ValidationErrorDto>;

// Common bulk operation DTO
export const BulkOperationDto = z.object({
  ids: z.array(z.string().uuid()),
  operation: z.enum(['delete', 'activate', 'deactivate', 'update']),
  data: z.record(z.any()).optional(),
});

export type BulkOperationDtoType = z.infer<typeof BulkOperationDto>;

// Common file upload DTO
export const FileUploadDto = z.object({
  filename: z.string().min(1),
  mimetype: z.string().min(1),
  size: z.number().int().min(1),
  buffer: z.instanceof(Buffer),
});

export type FileUploadDtoType = z.infer<typeof FileUploadDto>;
