# API Libraries

This directory contains the internal libraries for the API project.

## Structure

- `database/` - Database layer with Prisma ORM
  - Contains Prisma schema, migrations, and database services
  - Provides database connection and query services
  - Includes category-specific database operations

- `shared/` - Shared types, DTOs, and utilities
  - Common types and interfaces
  - Validation schemas using Zod
  - Utility functions
  - Constants

## Usage

Import from these libraries using the configured path aliases:

```typescript
// Database services
import { PrismaService } from '@libs/database';

// Shared types and utilities
import { CategoryDto } from '@libs/shared';
```

## Path Aliases

- `@libs/*` - Points to `./src/libs/*`
- `@libs/database/*` - Points to `./src/libs/database/*`
- `@libs/shared/*` - Points to `./src/libs/shared/*`
