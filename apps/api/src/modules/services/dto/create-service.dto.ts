import { IsString, IsOptional, IsDecimal, IsUUID, IsEnum } from 'class-validator';
import { ServiceStatus } from '@prisma/client';

export class CreateServiceDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDecimal()
  price?: number;

  @IsUUID()
  providerId: string;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsEnum(ServiceStatus)
  status?: ServiceStatus;
}