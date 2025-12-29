import { apiClient, PaginatedResponse } from './api';

export interface Service {
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

export interface CreateServiceData {
  providerId: string;
  categoryId: string;
  title: string;
  description?: string;
  price?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface UpdateServiceData {
  title?: string;
  description?: string;
  price?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  categoryId?: string;
}

export interface ServiceQueryParams {
  providerId?: string;
  categoryId?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  includeProvider?: boolean;
  includeCategory?: boolean;
}

export interface ServiceStats {
  total: number;
  active: number;
  inactive: number;
  byCategory: Record<string, number>;
  byProvider: Record<string, number>;
  averagePrice: number;
}

export class ServicesService {
  private basePath = '/services';

  async getAll(params?: ServiceQueryParams): Promise<Service[]> {
    return apiClient.get<Service[]>(
      this.basePath,
      params as Record<string, unknown>
    );
  }

  async getById(id: string): Promise<Service> {
    return apiClient.get<Service>(`${this.basePath}/${id}`);
  }

  async create(data: CreateServiceData): Promise<Service> {
    return apiClient.post<Service>(this.basePath, data);
  }

  async update(id: string, data: UpdateServiceData): Promise<Service> {
    return apiClient.put<Service>(`${this.basePath}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  async getStats(): Promise<ServiceStats> {
    return apiClient.get<ServiceStats>(`${this.basePath}/stats`);
  }

  async getPaginated(
    page: number = 1,
    limit: number = 10,
    params?: ServiceQueryParams
  ): Promise<PaginatedResponse<Service>> {
    const offset = (page - 1) * limit;
    return apiClient.get<PaginatedResponse<Service>>(this.basePath, {
      ...params,
      limit,
      offset,
    });
  }
}

export const servicesService = new ServicesService();
