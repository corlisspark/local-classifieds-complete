// /Users/thiagotavares/Projects/Services/apps/frontend/src/hooks/index.ts

// Export existing hooks
export {
  useCategoryTranslations,
  getCategoryName,
  getCategoryDescription,
} from './useTranslations';

// Re-export category hooks from services
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
  categoryKeys,
} from '../services/categories.hooks';
