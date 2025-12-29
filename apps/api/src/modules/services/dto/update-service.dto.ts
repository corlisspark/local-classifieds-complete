import { ServiceStatus } from '@prisma/client';

export class UpdateServiceDto {
  title?: string;
  description?: string;
  price?: number;
  providerId?: string;
  categoryId?: string;
  status?: ServiceStatus;
}