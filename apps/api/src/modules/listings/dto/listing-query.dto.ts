export interface ListingQueryDto {
  categoryId?: string;
  providerId?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  includeProvider?: boolean;
  includeCategory?: boolean;
  limit?: number;
  offset?: number;
}