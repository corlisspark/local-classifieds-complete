// /Users/thiagotavares/Projects/Services/apps/frontend/src/services/categories.hooks.ts

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { categoriesService } from './categories';
import type { PaginatedResponse } from './api';
import type {
  Category,
  CategoryQueryParams,
  CategoryStats,
  CreateCategoryData,
  UpdateCategoryData,
} from './categories';

// Query keys for React Query cache
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (params: CategoryQueryParams) =>
    [...categoryKeys.lists(), params] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
  bySlug: (slug: string) => [...categoryKeys.all, 'slug', slug] as const,
  hierarchy: (includeInactive?: boolean) =>
    [...categoryKeys.all, 'hierarchy', includeInactive] as const,
  stats: () => [...categoryKeys.all, 'stats'] as const,
} as const;

/**
 * Hook para buscar todas as categorias
 */
export function useCategories(
  params?: CategoryQueryParams,
  options?: Omit<UseQueryOptions<Category[], Error>, 'queryKey' | 'queryFn'>
) {
  // Valores padrão sensatos
  const defaultParams: CategoryQueryParams = {
    includeInactive: false,
    includeChildren: false,
    ...params,
  };

  return useQuery({
    queryKey: categoryKeys.list(defaultParams),
    queryFn: () => categoriesService.getAll(defaultParams),
    ...options,
  });
}

/**
 * Hook para buscar categorias com paginação
 */
export function useCategoriesPaginated(
  page: number = 1,
  limit: number = 10,
  params?: Omit<CategoryQueryParams, 'limit' | 'offset'>,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Category>, Error>,
    'queryKey' | 'queryFn'
  >
) {
  // Valores padrão sensatos
  const defaultParams: Omit<CategoryQueryParams, 'limit' | 'offset'> = {
    includeInactive: false,
    includeChildren: false,
    ...params,
  };

  return useQuery({
    queryKey: categoryKeys.list({
      ...defaultParams,
      limit,
      offset: (page - 1) * limit,
    }),
    queryFn: () => categoriesService.getPaginated(page, limit, defaultParams),
    ...options,
  });
}

/**
 * Hook para buscar uma categoria por ID
 */
export function useCategory(
  id: string,
  params?: CategoryQueryParams,
  options?: Omit<UseQueryOptions<Category, Error>, 'queryKey' | 'queryFn'>
) {
  // Valores padrão sensatos
  const defaultParams: CategoryQueryParams = {
    includeInactive: false,
    includeChildren: true, // Para categoria individual, incluir filhos faz sentido
    ...params,
  };

  return useQuery({
    queryKey: [...categoryKeys.detail(id), defaultParams],
    queryFn: () => categoriesService.getById(id, defaultParams),
    enabled: !!id, // Só executa se o ID existir
    ...options,
  });
}

/**
 * Hook para buscar uma categoria por slug
 */
export function useCategoryBySlug(
  slug: string,
  params?: CategoryQueryParams,
  options?: Omit<UseQueryOptions<Category, Error>, 'queryKey' | 'queryFn'>
) {
  // Valores padrão sensatos
  const defaultParams: CategoryQueryParams = {
    includeInactive: false,
    includeChildren: true, // Para categoria individual, incluir filhos faz sentido
    ...params,
  };

  return useQuery({
    queryKey: [...categoryKeys.bySlug(slug), defaultParams],
    queryFn: () => categoriesService.getBySlug(slug, defaultParams),
    enabled: !!slug, // Só executa se o slug existir
    ...options,
  });
}

/**
 * Hook para buscar a hierarquia de categorias
 */
export function useCategoryHierarchy(
  includeInactive: boolean = false,
  options?: Omit<UseQueryOptions<Category[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: categoryKeys.hierarchy(includeInactive),
    queryFn: () => categoriesService.getHierarchy(),
    ...options,
  });
}

/**
 * Hook para buscar estatísticas das categorias
 */
export function useCategoryStats(
  options?: Omit<UseQueryOptions<CategoryStats, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: categoryKeys.stats(),
    queryFn: () => categoriesService.getStats(),
    ...options,
  });
}

/**
 * Hook para buscar categorias ativas (conveniência)
 * @deprecated Use useCategories() instead - it now defaults to active categories
 */
export function useActiveCategories(
  params?: Omit<CategoryQueryParams, 'includeInactive'>,
  options?: Omit<UseQueryOptions<Category[], Error>, 'queryKey' | 'queryFn'>
) {
  return useCategories({ ...params, includeInactive: false }, options);
}

/**
 * Hook para buscar categorias com filhos (conveniência)
 */
export function useCategoriesWithChildren(
  params?: Omit<CategoryQueryParams, 'includeChildren'>,
  options?: Omit<UseQueryOptions<Category[], Error>, 'queryKey' | 'queryFn'>
) {
  return useCategories({ ...params, includeChildren: true }, options);
}

/**
 * Hook para buscar categorias raiz (sem pai)
 */
export function useRootCategories(
  params?: Omit<CategoryQueryParams, 'parentId'>,
  options?: Omit<UseQueryOptions<Category[], Error>, 'queryKey' | 'queryFn'>
) {
  return useCategories({ ...params, parentId: undefined }, options);
}

/**
 * Hook para buscar categorias filhas de uma categoria específica
 */
export function useChildCategories(
  parentId: string,
  params?: Omit<CategoryQueryParams, 'parentId'>,
  options?: Omit<UseQueryOptions<Category[], Error>, 'queryKey' | 'queryFn'>
) {
  return useCategories({ ...params, parentId }, options);
}

// ===== MUTATION HOOKS =====

/**
 * Hook para criar uma nova categoria
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryData) => categoriesService.create(data),
    onSuccess: () => {
      // Invalidar todas as queries relacionadas a categorias
      void queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}

/**
 * Hook para atualizar uma categoria
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryData }) =>
      categoriesService.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidar queries específicas da categoria e todas as listas
      void queryClient.invalidateQueries({ queryKey: categoryKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}

/**
 * Hook para deletar uma categoria
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoriesService.delete(id),
    onSuccess: () => {
      // Invalidar todas as queries relacionadas a categorias
      void queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}

/**
 * Hook para restaurar uma categoria
 */
export function useRestoreCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoriesService.restore(id),
    onSuccess: () => {
      // Invalidar todas as queries relacionadas a categorias
      void queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}
