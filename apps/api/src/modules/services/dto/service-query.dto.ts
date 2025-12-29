import { ServiceStatus } from '@prisma/client';

export interface ServiceQueryDto {
  limit?: number;
  offset?: number;
  providerId?: string;
  categoryId?: string;
  status?: ServiceStatus;
  search?: string;
  includeProvider?: boolean;
  includeCategory?: boolean;
}