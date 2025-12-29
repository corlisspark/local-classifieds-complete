import { ServiceStatus } from '@prisma/client';

export interface CreateServiceDto {
  title: string;
  description?: string;
  price?: number;
  providerId: string;
  categoryId: string;
  status?: ServiceStatus;
}