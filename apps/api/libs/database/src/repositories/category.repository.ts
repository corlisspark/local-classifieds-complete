// /Users/thiagotavares/Projects/Services/libs/database/src/repositories/category.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { Category, Prisma } from '@prisma/client';
import {
  CategoryWithChildren,
  CreateCategoryData,
  UpdateCategoryData,
  CategoryQueryOptions,
} from '../types';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryData): Promise<Category> {
    return this.prisma.category.create({
      data: {
        slug: data.slug,
        parentId: data.parentId,
        displayOrder: data.displayOrder,
        active: data.active ?? true,
        translations: {
          create:
            data.translations?.map(
              (translation: {
                language: string;
                name: string;
                description?: string;
              }) => ({
                language: translation.language,
                name: translation.name,
                description: translation.description,
              }),
            ) || [],
        },
      },
      include: {
        translations: true,
        parent: true,
        children: true,
      },
    });
  }

  async findById(
    id: string,
    options: CategoryQueryOptions = {},
  ): Promise<CategoryWithChildren | null> {
    const include: Prisma.CategoryInclude = {
      translations: options.includeTranslations ?? true,
      parent: options.includeParent ?? false,
      children: options.includeChildren ?? false,
    };

    return this.prisma.category.findUnique({
      where: { id },
      include,
    }) as Promise<CategoryWithChildren | null>;
  }

  async findBySlug(
    slug: string,
    options: CategoryQueryOptions = {},
  ): Promise<CategoryWithChildren | null> {
    const include: Prisma.CategoryInclude = {
      translations: options.includeTranslations ?? true,
      parent: options.includeParent ?? false,
      children: options.includeChildren ?? false,
    };

    return this.prisma.category.findUnique({
      where: { slug },
      include,
    }) as Promise<CategoryWithChildren | null>;
  }

  async findAll(
    options: CategoryQueryOptions = {},
  ): Promise<CategoryWithChildren[]> {
    const include: Prisma.CategoryInclude = {
      translations: options.includeTranslations ?? true,
      parent: options.includeParent ?? false,
    };

    // Só inclui children se explicitamente solicitado
    if (options.includeChildren) {
      include.children = {
        where: options.includeInactive ? {} : { active: true },
        orderBy: [{ displayOrder: 'asc' }],
      };
    }

    const where: Prisma.CategoryWhereInput = {
      active: options.includeInactive ? undefined : true,
      parentId: options.parentId,
    };

    return this.prisma.category.findMany({
      where,
      include,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
      take: options.limit,
      skip: options.offset,
    }) as Promise<CategoryWithChildren[]>;
  }

  async update(id: string, data: UpdateCategoryData): Promise<Category> {
    const updateData: Prisma.CategoryUpdateInput = {
      slug: data.slug,
      parent: data.parentId
        ? { connect: { id: data.parentId } }
        : data.parentId === null
          ? { disconnect: true }
          : undefined,
      displayOrder: data.displayOrder,
      active: data.active,
      updatedAt: new Date(),
    };

    // Handle translations update if provided
    if (data.translations) {
      updateData.translations = {
        deleteMany: {},
        create: data.translations.map(
          (translation: {
            language: string;
            name: string;
            description?: string;
          }) => ({
            language: translation.language,
            name: translation.name,
            description: translation.description,
          }),
        ),
      };
    }

    return this.prisma.category.update({
      where: { id },
      data: updateData,
      include: {
        translations: true,
        parent: true,
        children: true,
      },
    });
  }

  async softDelete(id: string): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        active: false,
        updatedAt: new Date(),
      },
      include: {
        translations: true,
        parent: true,
        children: true,
      },
    });
  }

  async restore(id: string): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        active: true,
        updatedAt: new Date(),
      },
      include: {
        translations: true,
        parent: true,
        children: true,
      },
    });
  }

  async getHierarchyTree(): Promise<CategoryWithChildren[]> {
    const categories = await this.prisma.category.findMany({
      where: { active: true, parentId: null },
      include: {
        translations: true,
        children: {
          where: { active: true },
          include: {
            translations: true,
            children: {
              where: { active: true },
              include: {
                translations: true,
              },
            },
          },
        },
      },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return categories as CategoryWithChildren[];
  }

  async validateHierarchy(
    parentId: string | null,
    categoryId?: string,
  ): Promise<boolean> {
    if (!parentId) return true;

    // Check if parent exists and is active
    const parent = await this.prisma.category.findUnique({
      where: { id: parentId },
      select: { id: true, active: true },
    });

    if (!parent || !parent.active) return false;

    // If updating, check for circular reference
    if (categoryId) {
      const wouldCreateCycle = await this.checkCircularReference(
        categoryId,
        parentId,
      );
      if (wouldCreateCycle) return false;
    }

    return true;
  }

  private async checkCircularReference(
    categoryId: string,
    newParentId: string,
  ): Promise<boolean> {
    let currentParentId: string | null = newParentId;

    while (currentParentId) {
      if (currentParentId === categoryId) return true;

      const parent: { parentId: string | null } | null =
        await this.prisma.category.findUnique({
          where: { id: currentParentId },
          select: { parentId: true },
        });

      currentParentId = parent?.parentId || null;
    }

    return false;
  }

  async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    withChildren: number;
  }> {
    const [total, active, inactive, withChildren] = await Promise.all([
      this.prisma.category.count(),
      this.prisma.category.count({ where: { active: true } }),
      this.prisma.category.count({ where: { active: false } }),
      this.prisma.category.count({
        where: {
          children: {
            some: {},
          },
        },
      }),
    ]);

    return { total, active, inactive, withChildren };
  }

  async findMany(where: Record<string, unknown>): Promise<Category[]> {
    return this.prisma.category.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }],
    });
  }

  async count(where: Record<string, unknown>): Promise<number> {
    return this.prisma.category.count({ where });
  }

  async findUnique(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    return this.prisma.category.findUnique({ where });
  }

  async findFirst(where: Record<string, unknown>): Promise<Category | null> {
    return this.prisma.category.findFirst({ where });
  }

  async findPaginated(
    options: CategoryQueryOptions & { limit?: number; offset?: number } = {},
  ): Promise<CategoryWithChildren[]> {
    const where: Prisma.CategoryWhereInput = {};

    if (!options.includeInactive) {
      where.active = true;
    }

    if (options.parentId !== undefined) {
      where.parentId = options.parentId;
    }

    const include: Prisma.CategoryInclude = {
      translations: options.includeTranslations ?? true,
      parent: options.includeParent ?? false,
    };

    // Só inclui children se explicitamente solicitado
    if (options.includeChildren) {
      include.children = {
        where: options.includeInactive ? {} : { active: true },
        orderBy: [{ displayOrder: 'asc' }],
      };
    }

    return this.prisma.category.findMany({
      where,
      include,
      orderBy: [{ displayOrder: 'asc' }],
      take: options.limit,
      skip: options.offset,
    }) as Promise<CategoryWithChildren[]>;
  }
}
