// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/entities/category.entity.ts

export interface CategoryTranslation {
  id: string;
  language: string;
  name: string;
  description?: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryEntity {
  id: string;
  slug: string;
  parentId?: string | null;
  displayOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  translations?: CategoryTranslation[];
  parent?: CategoryEntity | null;
  children?: CategoryEntity[];
}

export class CategoryDomainEntity {
  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly parentId: string | null,
    public readonly displayOrder: number,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt: Date | null,
    public readonly translations: CategoryTranslation[] = [],
    public readonly parent: CategoryDomainEntity | null = null,
    public readonly children: CategoryDomainEntity[] = [],
  ) {}

  get name(): string {
    return this.translations[0]?.name || this.slug;
  }

  get description(): string | undefined {
    return this.translations[0]?.description;
  }

  get isParent(): boolean {
    return this.children.length > 0;
  }

  get isChild(): boolean {
    return this.parentId !== null;
  }

  get isActive(): boolean {
    return this.active && !this.deletedAt;
  }

  get fullPath(): string {
    if (this.parent) {
      return `${this.parent.fullPath} > ${this.name}`;
    }
    return this.name;
  }

  static fromPrisma(prismaCategory: {
    id: string;
    slug: string;
    parentId: string | null;
    displayOrder: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    translations?: CategoryTranslation[];
    parent?: {
      id: string;
      slug: string;
      parentId: string | null;
      displayOrder: number;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
      translations?: CategoryTranslation[];
      parent?: never;
      children?: never[];
    };
    children?: Array<{
      id: string;
      slug: string;
      parentId: string | null;
      displayOrder: number;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
      translations?: CategoryTranslation[];
      parent?: never;
      children?: never[];
    }>;
  }): CategoryDomainEntity {
    return new CategoryDomainEntity(
      prismaCategory.id,
      prismaCategory.slug,
      prismaCategory.parentId,
      prismaCategory.displayOrder,
      prismaCategory.active,
      prismaCategory.createdAt,
      prismaCategory.updatedAt,
      prismaCategory.deletedAt,
      prismaCategory.translations || [],
      prismaCategory.parent
        ? CategoryDomainEntity.fromPrisma(prismaCategory.parent)
        : null,
      prismaCategory.children?.map((child) =>
        CategoryDomainEntity.fromPrisma(child),
      ) || [],
    );
  }

  toJSON(): CategoryEntity {
    return {
      id: this.id,
      slug: this.slug,
      parentId: this.parentId,
      displayOrder: this.displayOrder,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      translations: this.translations,
      parent: this.parent?.toJSON() || null,
      children: this.children.map((child) => child.toJSON()),
    };
  }
}
