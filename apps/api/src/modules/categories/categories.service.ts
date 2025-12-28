// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/categories.service.ts

import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../../libs/database/src/repositories/category.repository';
import type { Category } from '@prisma/client';
import {
  CategoryWithChildren,
  CategoryHierarchyValidation,
  CreateCategoryData,
  UpdateCategoryData,
  CategoryQueryOptions,
} from '../../../libs/database/src/types';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  /**
   * Create a new category
   */
  async create(data: CreateCategoryData): Promise<Category> {
    // Validate hierarchy before creating
    if (data.parentId) {
      const validation = await this.validateHierarchy(data.parentId, null);
      if (!validation.isValid) {
        throw new Error(`Invalid hierarchy: ${validation.error}`);
      }
    }

    // Check if slug already exists
    const existingCategory = await this.categoryRepository.findUnique({
      slug: data.slug,
    });

    if (existingCategory) {
      throw new Error(`Category with slug '${data.slug}' already exists`);
    }

    return this.categoryRepository.create(data);
  }

  /**
   * Find category by ID
   */
  async findById(
    id: string,
    options: CategoryQueryOptions = {},
  ): Promise<CategoryWithChildren | null> {
    const include: {
      children?: {
        where?: { active?: boolean };
        orderBy: Array<{ displayOrder: 'asc' | 'desc' }>;
      };
      translations?: boolean;
    } = {
      translations: true,
    };

    if (options.includeChildren) {
      include.children = {
        where: options.includeInactive ? {} : { active: true },
        orderBy: [{ displayOrder: 'asc' }],
      };
    }

    return this.categoryRepository.findById(id, options);
  }

  /**
   * Find category by slug
   */
  async findBySlug(
    slug: string,
    options: CategoryQueryOptions = {},
  ): Promise<CategoryWithChildren | null> {
    const include: {
      children?: {
        where?: { active?: boolean };
        orderBy: Array<{ displayOrder: 'asc' | 'desc' }>;
      };
      translations?: boolean;
    } = {
      translations: true,
    };

    if (options.includeChildren) {
      include.children = {
        where: options.includeInactive ? {} : { active: true },
        orderBy: [{ displayOrder: 'asc' }],
      };
    }

    return this.categoryRepository.findBySlug(slug, options);
  }

  /**
   * Find all categories with optional filtering
   */
  async findAll(
    options: CategoryQueryOptions = {},
  ): Promise<CategoryWithChildren[]> {
    const where: {
      active?: boolean;
      parentId?: string | null;
    } = {};

    if (!options.includeInactive) {
      where.active = true;
    }

    if (options.parentId !== undefined) {
      where.parentId = options.parentId;
    }

    const include: {
      children?: {
        where?: { active?: boolean };
        orderBy: Array<{ displayOrder: 'asc' | 'desc' }>;
      };
      translations?: boolean;
    } = {
      translations: true,
    };

    if (options.includeChildren) {
      include.children = {
        where: options.includeInactive ? {} : { active: true },
        orderBy: [{ displayOrder: 'asc' }],
      };
    }

    return this.categoryRepository.findAll(options);
  }

  /**
   * Find categories with pagination
   */
  async findPaginated(
    options: CategoryQueryOptions & { limit?: number; offset?: number } = {},
  ): Promise<{
    data: CategoryWithChildren[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> {
    const limit = options.limit || 10;
    const offset = options.offset || 0;
    const page = Math.floor(offset / limit) + 1;

    const [data, total] = await Promise.all([
      this.categoryRepository.findPaginated({
        ...options,
        limit,
        offset,
      }),
      this.categoryRepository.count({
        active: options.includeInactive ? undefined : true,
        parentId: options.parentId,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Update category
   */
  async update(id: string, data: UpdateCategoryData): Promise<Category> {
    // Validate hierarchy if parentId is being changed
    if (data.parentId !== undefined) {
      const validation = await this.validateHierarchy(data.parentId, id);
      if (!validation.isValid) {
        throw new Error(`Invalid hierarchy: ${validation.error}`);
      }
    }

    // Check if slug already exists (excluding current category)
    if (data.slug) {
      const existingCategory = await this.categoryRepository.findFirst({
        slug: data.slug,
        id: { not: id },
      });

      if (existingCategory) {
        throw new Error(`Category with slug '${data.slug}' already exists`);
      }
    }

    return this.categoryRepository.update(id, data);
  }

  /**
   * Soft delete category (set active = false)
   */
  async softDelete(id: string): Promise<Category> {
    // Check if category has active children
    const childrenCount = await this.categoryRepository.count({
      parentId: id,
      active: true,
    });

    if (childrenCount > 0) {
      throw new Error(
        'Cannot delete category with active children. Please deactivate children first.',
      );
    }

    return this.categoryRepository.softDelete(id);
  }

  /**
   * Restore category (set active = true)
   */
  async restore(id: string): Promise<Category> {
    return this.categoryRepository.restore(id);
  }

  /**
   * Get category hierarchy tree
   */
  async getHierarchyTree(
    includeInactive = false,
  ): Promise<CategoryWithChildren[]> {
    const where = includeInactive ? {} : { active: true };

    const categories = await this.categoryRepository.findMany(where);

    return this.buildHierarchyTree(categories);
  }

  /**
   * Validate category hierarchy to prevent cycles
   */
  async validateHierarchy(
    parentId: string | null,
    excludeId: string | null,
  ): Promise<CategoryHierarchyValidation> {
    if (!parentId) {
      return { isValid: true };
    }

    if (parentId === excludeId) {
      return {
        isValid: false,
        error: 'Category cannot be its own parent',
        cyclePath: [parentId],
      };
    }

    const visited = new Set<string>();
    let currentId = parentId;
    const path: string[] = [];

    while (currentId) {
      if (visited.has(currentId)) {
        return {
          isValid: false,
          error: 'Circular reference detected in category hierarchy',
          cyclePath: [...path, currentId],
        };
      }

      if (currentId === excludeId) {
        return {
          isValid: false,
          error: 'Category cannot be a descendant of itself',
          cyclePath: [...path, currentId],
        };
      }

      visited.add(currentId);
      path.push(currentId);

      const category = await this.categoryRepository.findUnique({
        id: currentId,
      });

      if (!category) {
        return {
          isValid: false,
          error: `Parent category with ID '${currentId}' not found`,
        };
      }

      currentId = category.parentId || '';
    }

    return { isValid: true };
  }

  /**
   * Build hierarchy tree from flat category list
   */
  private buildHierarchyTree(categories: Category[]): CategoryWithChildren[] {
    const categoryMap = new Map<string, CategoryWithChildren>();
    const rootCategories: CategoryWithChildren[] = [];

    // Create map of all categories
    categories.forEach((category) => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    // Build hierarchy
    for (const category of categories) {
      const categoryWithChildren = categoryMap.get(category.id);
      if (!categoryWithChildren) continue;

      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent && parent.children) {
          parent.children.push(categoryWithChildren);
        }
      } else {
        rootCategories.push(categoryWithChildren);
      }
    }

    return rootCategories;
  }

  /**
   * Generate slug from name
   */
  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  }

  /**
   * Get category statistics
   */
  async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    withChildren: number;
    rootCategories: number;
  }> {
    const [total, active, inactive, withChildren, rootCategories] =
      await Promise.all([
        this.categoryRepository.count({}),
        this.categoryRepository.count({ active: true }),
        this.categoryRepository.count({ active: false }),
        this.categoryRepository.count({
          children: {
            some: {},
          },
        }),
        this.categoryRepository.count({
          parentId: null,
          active: true,
        }),
      ]);

    return {
      total,
      active,
      inactive,
      withChildren,
      rootCategories,
    };
  }
}
