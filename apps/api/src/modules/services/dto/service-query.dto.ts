import { ServiceStatus } from '@prisma/client';

export class ServiceQueryDto {
  limit?: number;
  offset?: number;
  providerId?: string;
  categoryId?: string;
  status?: ServiceStatus;
  search?: string;
  includeProvider?: boolean;
  includeCategory?: boolean;
}