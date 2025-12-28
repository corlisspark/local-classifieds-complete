// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/__tests__/categories.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../categories.service';
import { CategoryRepository } from '../../../../libs/database/src/repositories/category.repository';
import { CreateCategoryData } from '../../../../libs/database/src/types';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: CategoryRepository;

  const mockCategoryRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findBySlug: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    restore: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoryRepository,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createData: CreateCategoryData = {
        slug: 'test-category',
        displayOrder: 0,
      };

      const expectedCategory = {
        id: '1',
        slug: 'test-category',
        displayOrder: 0,
        active: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCategoryRepository.findUnique.mockResolvedValue(null);
      mockCategoryRepository.create.mockResolvedValue(expectedCategory);

      const result = await service.create(createData);

      expect(repository.findUnique).toHaveBeenCalledWith({
        slug: 'test-category',
      });
      expect(repository.create).toHaveBeenCalledWith(createData);
      expect(result).toEqual(expectedCategory);
    });

    it('should throw error if slug already exists', async () => {
      const createData: CreateCategoryData = {
        slug: 'existing-category',
        displayOrder: 0,
      };

      const existingCategory = {
        id: '1',
        slug: 'existing-category',
        displayOrder: 0,
        active: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCategoryRepository.findUnique.mockResolvedValue(existingCategory);

      await expect(service.create(createData)).rejects.toThrow(
        "Category with slug 'existing-category' already exists",
      );
    });
  });

  describe('findById', () => {
    it('should return a category by id', async () => {
      const categoryId = '1';
      const expectedCategory = {
        id: categoryId,
        slug: 'test-category',
        displayOrder: 0,
        active: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
      };

      mockCategoryRepository.findById.mockResolvedValue(expectedCategory);

      const result = await service.findById(categoryId);

      expect(repository.findById).toHaveBeenCalledWith(categoryId, {});
      expect(result).toEqual(expectedCategory);
    });

    it('should return null if category not found', async () => {
      const categoryId = 'non-existent';

      mockCategoryRepository.findById.mockResolvedValue(null);

      const result = await service.findById(categoryId);

      expect(repository.findById).toHaveBeenCalledWith(categoryId, {});
      expect(result).toBeNull();
    });
  });

  describe('findBySlug', () => {
    it('should return a category by slug', async () => {
      const slug = 'test-category';
      const expectedCategory = {
        id: '1',
        slug,
        displayOrder: 0,
        active: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: [],
      };

      mockCategoryRepository.findBySlug.mockResolvedValue(expectedCategory);

      const result = await service.findBySlug(slug);

      expect(repository.findBySlug).toHaveBeenCalledWith(slug, {});
      expect(result).toEqual(expectedCategory);
    });
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      const expectedCategories = [
        {
          id: '1',
          slug: 'test-category',
          displayOrder: 0,
          active: true,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          translations: [],
        },
      ];

      mockCategoryRepository.findAll.mockResolvedValue(expectedCategories);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalledWith({});
      expect(result).toEqual(expectedCategories);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const categoryId = '1';
      const updateData = {
        displayOrder: 1,
      };

      const expectedCategory = {
        id: categoryId,
        slug: 'test-category',
        displayOrder: 1,
        active: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCategoryRepository.update.mockResolvedValue(expectedCategory);

      const result = await service.update(categoryId, updateData);

      expect(repository.update).toHaveBeenCalledWith(categoryId, updateData);
      expect(result).toEqual(expectedCategory);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a category', async () => {
      const categoryId = '1';
      const expectedCategory = {
        id: categoryId,
        slug: 'test-category',
        displayOrder: 0,
        active: false,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCategoryRepository.count.mockResolvedValue(0);
      mockCategoryRepository.softDelete.mockResolvedValue(expectedCategory);

      const result = await service.softDelete(categoryId);

      expect(repository.count).toHaveBeenCalledWith({
        parentId: categoryId,
        active: true,
      });
      expect(repository.softDelete).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(expectedCategory);
    });

    it('should throw error if category has active children', async () => {
      const categoryId = '1';

      mockCategoryRepository.count.mockResolvedValue(2);

      await expect(service.softDelete(categoryId)).rejects.toThrow(
        'Cannot delete category with active children. Please deactivate children first.',
      );
    });
  });

  describe('restore', () => {
    it('should restore a category', async () => {
      const categoryId = '1';
      const expectedCategory = {
        id: categoryId,
        slug: 'test-category',
        displayOrder: 0,
        active: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCategoryRepository.restore.mockResolvedValue(expectedCategory);

      const result = await service.restore(categoryId);

      expect(repository.restore).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(expectedCategory);
    });
  });

  describe('getStats', () => {
    it('should return category statistics', async () => {
      const expectedStats = {
        total: 10,
        active: 8,
        inactive: 2,
        withChildren: 3,
        rootCategories: 5,
      };

      // Reset the mock to clear previous calls
      mockCategoryRepository.count.mockClear();

      mockCategoryRepository.count
        .mockResolvedValueOnce(10) // total
        .mockResolvedValueOnce(8) // active
        .mockResolvedValueOnce(2) // inactive
        .mockResolvedValueOnce(3) // withChildren
        .mockResolvedValueOnce(5); // rootCategories

      const result = await service.getStats();

      expect(repository.count).toHaveBeenCalledTimes(5);
      expect(result).toEqual(expectedStats);
    });
  });

  describe('generateSlug', () => {
    it('should generate a valid slug from name', () => {
      const name = 'Categoria de Teste com Acentos';
      const expectedSlug = 'categoria-de-teste-com-acentos';

      const result = CategoriesService.generateSlug(name);

      expect(result).toBe(expectedSlug);
    });

    it('should handle special characters', () => {
      const name = 'Categoria @#$% Teste!';
      const expectedSlug = 'categoria-teste';

      const result = CategoriesService.generateSlug(name);

      expect(result).toBe(expectedSlug);
    });

    it('should handle multiple spaces', () => {
      const name = 'Categoria    com    espaços';
      const expectedSlug = 'categoria-com-espacos';

      const result = CategoriesService.generateSlug(name);

      expect(result).toBe(expectedSlug);
    });
  });
});
