// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/__tests__/categories.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../categories.controller';
import { CategoriesService } from '../categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findBySlug: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    restore: jest.fn(),
    getHierarchyTree: jest.fn(),
    getStats: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        slug: 'test-category',
        displayOrder: 0,
        translations: [
          {
            language: 'pt',
            name: 'Categoria Teste',
            description: 'Descrição da categoria teste',
          },
        ],
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

      mockCategoriesService.create.mockResolvedValue(expectedCategory);

      const result = await controller.create(createCategoryDto);

      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
      expect(result).toEqual(expectedCategory);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const expectedCategories = [
        {
          id: '1',
          slug: 'test-category',
          displayOrder: 0,
          active: true,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockCategoriesService.findAll.mockResolvedValue(expectedCategories);

      const result = await controller.findAll({
        includeChildren: false,
        includeInactive: false,
      });

      expect(service.findAll).toHaveBeenCalledWith({
        includeChildren: false,
        includeInactive: false,
      });
      expect(result).toEqual(expectedCategories);
    });
  });

  describe('findOne', () => {
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
      };

      mockCategoriesService.findById.mockResolvedValue(expectedCategory);

      const result = await controller.findOne(categoryId, {
        includeChildren: false,
        includeInactive: false,
      });

      expect(service.findById).toHaveBeenCalledWith(categoryId, {
        includeChildren: false,
        includeInactive: false,
      });
      expect(result).toEqual(expectedCategory);
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
      };

      mockCategoriesService.findBySlug.mockResolvedValue(expectedCategory);

      const result = await controller.findBySlug(slug, {
        includeChildren: false,
        includeInactive: false,
      });

      expect(service.findBySlug).toHaveBeenCalledWith(slug, {
        includeChildren: false,
        includeInactive: false,
      });
      expect(result).toEqual(expectedCategory);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const categoryId = '1';
      const updateCategoryDto: UpdateCategoryDto = {
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

      mockCategoriesService.update.mockResolvedValue(expectedCategory);

      const result = await controller.update(categoryId, updateCategoryDto);

      expect(service.update).toHaveBeenCalledWith(
        categoryId,
        updateCategoryDto,
      );
      expect(result).toEqual(expectedCategory);
    });
  });

  describe('remove', () => {
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

      mockCategoriesService.softDelete.mockResolvedValue(expectedCategory);

      const result = await controller.remove(categoryId);

      expect(service.softDelete).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(expectedCategory);
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

      mockCategoriesService.restore.mockResolvedValue(expectedCategory);

      const result = await controller.restore(categoryId);

      expect(service.restore).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(expectedCategory);
    });
  });

  describe('getHierarchy', () => {
    it('should return category hierarchy tree', async () => {
      const expectedHierarchy = [
        {
          id: '1',
          slug: 'parent-category',
          displayOrder: 0,
          active: true,
          parentId: null,
          children: [
            {
              id: '2',
              slug: 'child-category',
              displayOrder: 0,
              active: true,
              parentId: '1',
              children: [],
            },
          ],
        },
      ];

      mockCategoriesService.getHierarchyTree.mockResolvedValue(
        expectedHierarchy,
      );

      const result = await controller.getHierarchy('false');

      expect(service.getHierarchyTree).toHaveBeenCalledWith(false);
      expect(result).toEqual(expectedHierarchy);
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

      mockCategoriesService.getStats.mockResolvedValue(expectedStats);

      const result = await controller.getStats();

      expect(service.getStats).toHaveBeenCalled();
      expect(result).toEqual(expectedStats);
    });
  });
});
