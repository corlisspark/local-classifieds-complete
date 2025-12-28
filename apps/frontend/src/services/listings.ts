import { apiClient, PaginatedResponse } from './api';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price?: number;
  currency?: string;
  categoryId: string;
  userId: string;
  status: 'draft' | 'active' | 'sold' | 'expired' | 'archived';
  featured: boolean;
  images: string[];
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contactInfo: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface CreateListingData {
  title: string;
  description: string;
  price?: number;
  currency?: string;
  categoryId: string;
  status?: 'draft' | 'active';
  featured?: boolean;
  images?: string[];
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contactInfo: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  expiresAt?: string;
}

export interface UpdateListingData {
  title?: string;
  description?: string;
  price?: number;
  currency?: string;
  categoryId?: string;
  status?: 'draft' | 'active' | 'sold' | 'expired' | 'archived';
  featured?: boolean;
  images?: string[];
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  expiresAt?: string;
}

export interface ListingQueryParams {
  categoryId?: string;
  userId?: string;
  status?: string;
  featured?: boolean;
  city?: string;
  state?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'price' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface ListingStats {
  total: number;
  byStatus: Record<string, number>;
  byCategory: Record<string, number>;
  byLocation: Record<string, number>;
  averagePrice: number;
  featured: number;
}

export class ListingsService {
  private basePath = '/listings';

  async getAll(params?: ListingQueryParams): Promise<Listing[]> {
    return apiClient.get<Listing[]>(
      this.basePath,
      params as Record<string, unknown>
    );
  }

  async getById(id: string): Promise<Listing> {
    return apiClient.get<Listing>(`${this.basePath}/${id}`);
  }

  async getBySlug(slug: string): Promise<Listing> {
    return apiClient.get<Listing>(`${this.basePath}/slug/${slug}`);
  }

  async create(data: CreateListingData): Promise<Listing> {
    return apiClient.post<Listing>(this.basePath, data);
  }

  async update(id: string, data: UpdateListingData): Promise<Listing> {
    return apiClient.put<Listing>(`${this.basePath}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  async feature(id: string): Promise<Listing> {
    return apiClient.post<Listing>(`${this.basePath}/${id}/feature`);
  }

  async unfeature(id: string): Promise<Listing> {
    return apiClient.post<Listing>(`${this.basePath}/${id}/unfeature`);
  }

  async renew(id: string, days: number = 30): Promise<Listing> {
    return apiClient.post<Listing>(`${this.basePath}/${id}/renew`, { days });
  }

  async getStats(): Promise<ListingStats> {
    return apiClient.get<ListingStats>(`${this.basePath}/stats`);
  }

  async getPaginated(
    page: number = 1,
    limit: number = 10,
    params?: Omit<ListingQueryParams, 'limit' | 'offset'>
  ): Promise<PaginatedResponse<Listing>> {
    const offset = (page - 1) * limit;
    return apiClient.get<PaginatedResponse<Listing>>(this.basePath, {
      ...params,
      limit,
      offset,
    });
  }

  async search(
    query: string,
    filters?: Omit<ListingQueryParams, 'search'>
  ): Promise<Listing[]> {
    return apiClient.get<Listing[]>(`${this.basePath}/search`, {
      ...filters,
      search: query,
    });
  }
}

export const listingsService = new ListingsService();
