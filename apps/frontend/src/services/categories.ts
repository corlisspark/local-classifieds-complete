import { apiClient, PaginatedResponse } from './api';

export interface CategoryTranslation {
  id: string;
  language: string;
  name: string;
  description?: string;
}

export interface Category {
  id: string;
  slug: string;
  parentId?: string | null;
  displayOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  translations: CategoryTranslation[];
  parent?: Category | null;
  children?: Category[];
}

export interface CreateCategoryData {
  slug: string;
  parentId?: string | null;
  displayOrder?: number;
  translations: Array<{
    language: string;
    name: string;
    description?: string;
  }>;
}

export interface UpdateCategoryData {
  slug?: string;
  parentId?: string | null;
  displayOrder?: number;
  active?: boolean;
  translations?: Array<{
    language: string;
    name: string;
    description?: string;
  }>;
}

export interface CategoryQueryParams {
  includeChildren?: boolean;
  includeInactive?: boolean;
  parentId?: string;
  limit?: number;
  offset?: number;
}

export interface CategoryStats {
  total: number;
  active: number;
  inactive: number;
  withChildren: number;
}

export class CategoriesService {
  private basePath = '/categories';

  async getAll(params?: CategoryQueryParams): Promise<Category[]> {
    return apiClient.get<Category[]>(
      this.basePath,
      params as Record<string, unknown>
    );
  }

  async getById(id: string, params?: CategoryQueryParams): Promise<Category> {
    return apiClient.get<Category>(
      `${this.basePath}/${id}`,
      params as Record<string, unknown>
    );
  }

  async getBySlug(
    slug: string,
    params?: CategoryQueryParams
  ): Promise<Category> {
    return apiClient.get<Category>(
      `${this.basePath}/slug/${slug}`,
      params as Record<string, unknown>
    );
  }

  async create(data: CreateCategoryData): Promise<Category> {
    return apiClient.post<Category>(this.basePath, data);
  }

  async update(id: string, data: UpdateCategoryData): Promise<Category> {
    return apiClient.put<Category>(`${this.basePath}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  async restore(id: string): Promise<Category> {
    return apiClient.put<Category>(`${this.basePath}/${id}/restore`);
  }

  async getHierarchy(): Promise<Category[]> {
    return apiClient.get<Category[]>(`${this.basePath}/hierarchy`);
  }

  async getStats(): Promise<CategoryStats> {
    return apiClient.get<CategoryStats>(`${this.basePath}/stats`);
  }

  async getPaginated(
    page: number = 1,
    limit: number = 10,
    params?: Omit<CategoryQueryParams, 'limit' | 'offset'>
  ): Promise<PaginatedResponse<Category>> {
    const offset = (page - 1) * limit;
    return apiClient.get<PaginatedResponse<Category>>(this.basePath, {
      ...params,
      limit,
      offset,
    });
  }
}

export const categoriesService = new CategoriesService();
