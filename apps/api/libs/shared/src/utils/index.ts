// /Users/thiagotavares/Projects/Services/libs/shared/src/utils/index.ts
import { ApiResponse, PaginatedResponse, PaginationParams } from '../types';

export function createApiResponse<T>(
  data?: T,
  message?: string,
  success: boolean = true,
): ApiResponse<T> {
  return {
    success,
    data,
    message,
  };
}

export function createErrorResponse(
  error: string,
  message?: string,
): ApiResponse {
  return {
    success: false,
    error,
    message,
  };
}

export function createPaginatedResponse<T>(
  data: T[],
  pagination: PaginationParams & { total: number },
): PaginatedResponse<T> {
  const page = pagination.page || 1;
  const limit = pagination.limit || 10;
  const totalPages = Math.ceil(pagination.total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total: pagination.total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(date: Date): string {
  return date.toISOString();
}

export function parseDate(dateString: string): Date {
  return new Date(dateString);
}
