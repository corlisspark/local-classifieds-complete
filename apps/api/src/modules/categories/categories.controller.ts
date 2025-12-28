// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/categories.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  CreateCategorySchema,
} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CategoryQueryDto,
  CategoryQuerySchema,
} from './dto/category-query.dto';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { UserRole } from '@prisma/client';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN)
  async create(
    @Body(new ZodValidationPipe(CreateCategorySchema))
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CLIENT)
  async findAll(
    @Query(new ZodValidationPipe(CategoryQuerySchema)) query: CategoryQueryDto,
  ) {
    // Se houver limit ou offset, é uma requisição paginada
    if (query.limit || query.offset) {
      return this.categoriesService.findPaginated(query);
    }
    return this.categoriesService.findAll(query);
  }

  @Get('hierarchy')
  @Roles(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CLIENT)
  async getHierarchy(@Query('includeInactive') includeInactive?: string) {
    const includeInactiveBool = includeInactive === 'true';
    return this.categoriesService.getHierarchyTree(includeInactiveBool);
  }

  @Get('stats')
  @Roles(UserRole.ADMIN)
  async getStats() {
    return this.categoriesService.getStats();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CLIENT)
  async findOne(@Param('id') id: string, @Query() query: CategoryQueryDto) {
    return this.categoriesService.findById(id, query);
  }

  @Get('slug/:slug')
  @Roles(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CLIENT)
  async findBySlug(
    @Param('slug') slug: string,
    @Query() query: CategoryQueryDto,
  ) {
    return this.categoriesService.findBySlug(slug, query);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.categoriesService.softDelete(id);
  }

  @Put(':id/restore')
  @Roles(UserRole.ADMIN)
  async restore(@Param('id') id: string) {
    return this.categoriesService.restore(id);
  }
}
