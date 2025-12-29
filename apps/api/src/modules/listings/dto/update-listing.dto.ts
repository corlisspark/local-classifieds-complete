export interface UpdateListingDto {
  title?: string;
  description?: string;
  price?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  categoryId?: string;
}