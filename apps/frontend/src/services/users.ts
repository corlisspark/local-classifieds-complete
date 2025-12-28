import { apiClient, PaginatedResponse } from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'moderator';
  active: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
  role?: 'admin' | 'user' | 'moderator';
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  avatar?: string;
  role?: 'admin' | 'user' | 'moderator';
  active?: boolean;
}

export interface UserQueryParams {
  role?: string;
  active?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  byRole: Record<string, number>;
}

export class UsersService {
  private basePath = '/users';

  async getAll(params?: UserQueryParams): Promise<User[]> {
    return apiClient.get<User[]>(
      this.basePath,
      params as Record<string, unknown>
    );
  }

  async getById(id: string): Promise<User> {
    return apiClient.get<User>(`${this.basePath}/${id}`);
  }

  async getByEmail(email: string): Promise<User> {
    return apiClient.get<User>(`${this.basePath}/email/${email}`);
  }

  async create(data: CreateUserData): Promise<User> {
    return apiClient.post<User>(this.basePath, data);
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    return apiClient.put<User>(`${this.basePath}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  async activate(id: string): Promise<User> {
    return apiClient.post<User>(`${this.basePath}/${id}/activate`);
  }

  async deactivate(id: string): Promise<User> {
    return apiClient.post<User>(`${this.basePath}/${id}/deactivate`);
  }

  async getStats(): Promise<UserStats> {
    return apiClient.get<UserStats>(`${this.basePath}/stats`);
  }

  async getPaginated(
    page: number = 1,
    limit: number = 10,
    params?: Omit<UserQueryParams, 'limit' | 'offset'>
  ): Promise<PaginatedResponse<User>> {
    const offset = (page - 1) * limit;
    return apiClient.get<PaginatedResponse<User>>(this.basePath, {
      ...params,
      limit,
      offset,
    });
  }
}

export const usersService = new UsersService();
