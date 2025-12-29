import { ServiceStatus } from '@prisma/client';

export interface UpdateServiceDto {
  title?: string;
  description?: string;
  price?: number;
  providerId?: string;
  categoryId?: string;
  status?: ServiceStatus;
}