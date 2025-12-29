import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  servicesService,
  CreateServiceData,
  UpdateServiceData,
  ServiceQueryParams,
} from '../services/services';

export const useServices = (params?: ServiceQueryParams) => {
  return useQuery({
    queryKey: ['services', params],
    queryFn: () => servicesService.getAll(params),
  });
};

export const useServicesPaginated = (
  page: number,
  limit: number,
  params?: ServiceQueryParams
) => {
  return useQuery({
    queryKey: ['services', 'paginated', page, limit, params],
    queryFn: () => servicesService.getPaginated(page, limit, params),
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: ['services', id],
    queryFn: () => servicesService.getById(id),
    enabled: !!id,
  });
};

export const useServiceStats = () => {
  return useQuery({
    queryKey: ['services', 'stats'],
    queryFn: () => servicesService.getStats(),
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceData) => servicesService.create(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceData }) =>
      servicesService.update(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => servicesService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};