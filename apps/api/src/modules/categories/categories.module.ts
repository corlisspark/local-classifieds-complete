// /Users/thiagotavares/Projects/Services/apps/api/src/modules/categories/categories.module.ts

import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { DatabaseModule } from '../../../libs/database/src/database.module';
import { CategoryRepository } from '../../../libs/database/src/repositories/category.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
