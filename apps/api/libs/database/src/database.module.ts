// /Users/thiagotavares/Projects/Services/libs/database/src/database.module.ts

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryRepository } from './repositories/category.repository';

@Global()
@Module({
  providers: [PrismaService, CategoryRepository],
  exports: [PrismaService, CategoryRepository],
})
export class DatabaseModule {}
