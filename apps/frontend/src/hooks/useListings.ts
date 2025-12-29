import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listingsService,
  CreateListingData,
  UpdateListingData,
  ListingQueryParams,
} from '../services/listings';

export const useListings = (params?: ListingQueryParams) => {
  return useQuery({
    queryKey: ['listings', params],
    queryFn: () => listingsService.getAll(params),
  });
};

export const useListingsPaginated = (
  page: number,
  limit: number,
  params?: ListingQueryParams
) => {
  return useQuery({
    queryKey: ['listings', 'paginated', page, limit, params],
    queryFn: () => listingsService.getPaginated(page, limit, params),
  });
};

export const useListing = (id: string) => {
  return useQuery({
    queryKey: ['listings', id],
    queryFn: () => listingsService.getById(id),
    enabled: !!id,
  });
};

export const useListingStats = () => {
  return useQuery({
    queryKey: ['listings', 'stats'],
    queryFn: () => listingsService.getStats(),
  });
};

export const useCreateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateListingData) => listingsService.create(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};

export const useUpdateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateListingData }) =>
      listingsService.update(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};

export const useDeleteListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => listingsService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};