export { apiClient, handleApiError } from './api';
export type { ApiResponse, PaginatedResponse, ApiError } from './api';

export { categoriesService, CategoriesService } from './categories';
export type {
  Category,
  CategoryTranslation,
  CreateCategoryData,
  UpdateCategoryData,
  CategoryQueryParams,
  CategoryStats,
} from './categories';

// Category hooks
export {
  useCategories,
  useCategoriesPaginated,
  useCategory,
  useCategoryBySlug,
  useCategoryHierarchy,
  useCategoryStats,
  useActiveCategories,
  useCategoriesWithChildren,
  useRootCategories,
  useChildCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useRestoreCategory,
  categoryKeys,
} from './categories.hooks';

export { usersService, UsersService } from './users';
export type {
  User,
  CreateUserData,
  UpdateUserData,
  UserQueryParams,
  UserStats,
} from './users';

export { listingsService, ListingsService } from './listings';
export type {
  Listing,
  CreateListingData,
  UpdateListingData,
  ListingQueryParams,
  ListingStats,
} from './listings';

export { servicesService, ServicesService } from './services';
export type {
  Service,
  CreateServiceData,
  UpdateServiceData,
  ServiceQueryParams,
  ServiceStats,
} from './services';
