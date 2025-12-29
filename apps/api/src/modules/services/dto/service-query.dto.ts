import { IsOptional, IsString, IsUUID, IsEnum, IsBoolean, Transform } from 'class-validator';
import { ServiceStatus } from '@prisma/client';

export class ServiceQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  offset?: number;

  @IsOptional()
  @IsUUID()
  providerId?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsEnum(ServiceStatus)
  status?: ServiceStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  includeProvider?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  includeCategory?: boolean;
}