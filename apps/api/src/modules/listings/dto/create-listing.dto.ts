export interface CreateListingDto {
  providerId: string;
  categoryId: string;
  title: string;
  description?: string;
  price?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}