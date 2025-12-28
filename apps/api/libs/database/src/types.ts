// /Users/thiagotavares/Projects/Services/libs/database/src/types.ts

import type { Category, CategoryTranslation } from '@prisma/client';

// Re-export Prisma types
export type { Category, CategoryTranslation };

// Custom Category interface with additional computed properties
export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[];
  translations?: CategoryTranslation[];
}

// Category with specific language translation
export interface CategoryWithTranslation
  extends Omit<Category, 'translations'> {
  translation?: CategoryTranslation;
  children?: CategoryWithTranslation[];
}

// Category hierarchy validation result
export interface CategoryHierarchyValidation {
  isValid: boolean;
  error?: string;
  cyclePath?: string[];
}

// Category creation/update data
export interface CreateCategoryData {
  slug: string;
  parentId?: string | null;
  displayOrder?: number;
  active?: boolean;
  translations?: Array<{
    language: string;
    name: string;
    description?: string;
  }>;
}

export interface UpdateCategoryData {
  slug?: string;
  parentId?: string | null;
  active?: boolean;
  displayOrder?: number;
  translations?: Array<{
    language: string;
    name: string;
    description?: string;
  }>;
}

// Category query options
export interface CategoryQueryOptions {
  includeInactive?: boolean;
  includeChildren?: boolean;
  includeParent?: boolean;
  includeTranslations?: boolean;
  parentId?: string | null;
  limit?: number;
  offset?: number;
}
