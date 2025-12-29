// Base API configuration and utilities

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.RAILWAY_SERVICE_API_URL
    ? `https://${process.env.RAILWAY_SERVICE_API_URL}/api`
    : 'http://localhost:3000/api');

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  success: false;
  message: string;
  error: string;
  statusCode: number;
  timestamp: string;
  path: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = (await response.json()) as ApiError;
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const responseText = await response.text();

      // Se não há conteúdo (como em DELETE 204), retorna undefined
      if (!responseText) {
        return undefined as T;
      }

      // A API retorna dados diretamente, não em um wrapper ApiResponse
      const data = JSON.parse(responseText) as T;

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    let url = endpoint;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(
            key,
            typeof value === 'string' ? value : JSON.stringify(value)
          );
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return this.request<T>(url);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

export const apiClient = new ApiClient();

// Utility function for handling API errors
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
