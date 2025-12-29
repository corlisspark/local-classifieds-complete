import { apiClient, PaginatedResponse } from './api';

export interface Listing {
  id: string;
  providerId: string;
  categoryId: string;
  title: string;
  description?: string;
  price?: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  provider?: {
    id: string;
    userId: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  category?: {
    id: string;
    slug: string;
    translations?: Array<{
      language: string;
      name: string;
      description?: string;
    }>;
  };
}

export interface CreateListingData {
  providerId: string;
  categoryId: string;
  title: string;
  description?: string;
  price?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface UpdateListingData {
  title?: string;
  description?: string;
  price?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  categoryId?: string;
}

export interface ListingQueryParams {
  categoryId?: string;
  providerId?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  includeProvider?: boolean;
  includeCategory?: boolean;
  limit?: number;
  offset?: number;
}

export interface ListingStats {
  total: number;
  active: number;
  inactive: number;
  byCategory: Record<string, number>;
  byProvider: Record<string, number>;
  averagePrice: number;
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
