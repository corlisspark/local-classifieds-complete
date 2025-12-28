# Database Library

This library provides database access and services for the Local Classifieds platform.

## Overview

The database library is built on top of Prisma ORM and provides:

- Database connection management
- Data models and services
- Type-safe database operations
- Migration management

## Models

### Category

The Category model represents service categories with hierarchical support.

#### Features

- **Hierarchical Structure**: Parent-child relationships
- **Soft Delete**: Uses `active` field instead of physical deletion
- **Unique Slugs**: URL-friendly identifiers
- **Display Ordering**: Configurable UI ordering

#### Schema

```typescript
model Category {
  id            String     @id @default(uuid()) @db.Uuid
  name          String     @db.VarChar(120)
  slug          String     @unique @db.VarChar(140)
  description   String?    @db.Text
  parentId      String?    @db.Uuid
  parent        Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id], onUpdate: Cascade, onDelete: SetNull)
  children      Category[] @relation("CategoryHierarchy")
  active        Boolean    @default(true)
  displayOrder  Int        @default(0)
  createdAt     DateTime   @default(now()) @db.Timestamptz(6)
  updatedAt     DateTime   @default(now()) @updatedAt @db.Timestamptz(6)

  @@map("categories")
}
```

#### Database Constraints

- **Primary Key**: `id` (UUID)
- **Unique Index**: `slug` for fast lookups
- **Foreign Key**: `parentId` references `categories(id)`
- **Indexes**: `parentId`, `active` for performance

## Services

### DatabaseService

Singleton service for database connection management.

```typescript
import { databaseService } from '@libs/database';

// Connect to database
await databaseService.connect();

// Health check
const isHealthy = await databaseService.healthCheck();

// Access Prisma client
const prisma = databaseService.prisma;
```

### CategoryService

Service for category operations with business logic and validations.

```typescript
import { CategoryService } from '@libs/database';

const categoryService = new CategoryService(prisma);

// Create category
const category = await categoryService.create({
  name: 'Plumber',
  slug: 'plumber',
  description: 'Plumbing services',
});

// Find by slug
const category = await categoryService.findBySlug('plumber');

// Get hierarchy tree
const tree = await categoryService.getHierarchyTree();

// Validate hierarchy
const validation = await categoryService.validateHierarchy(parentId, excludeId);
```

## Types

### Core Types

```typescript
// Category with children
interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[];
}

// Hierarchy validation result
interface CategoryHierarchyValidation {
  isValid: boolean;
  error?: string;
  cyclePath?: string[];
}

// Category creation data
interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  displayOrder?: number;
}

// Category update data
interface UpdateCategoryData {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
  active?: boolean;
  displayOrder?: number;
}

// Query options
interface CategoryQueryOptions {
  includeInactive?: boolean;
  includeChildren?: boolean;
  parentId?: string | null;
  limit?: number;
  offset?: number;
}
```

## Business Rules

### Category Hierarchy

1. **No Self-Reference**: Category cannot be its own parent
2. **No Cycles**: Prevents circular references in hierarchy
3. **Soft Delete Protection**: Categories with active children cannot be deleted
4. **Slug Uniqueness**: Each category must have a unique slug

### Slug Generation

Slugs are automatically generated from category names:

- Convert to lowercase
- Remove accents
- Replace spaces with hyphens
- Remove special characters
- Ensure uniqueness

## Migration and Seeding

### Running Migrations

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset
```

### Seeding Data

The database includes seed data with 20 local service categories:

- Encanador (Plumber)
- Eletricista (Electrician)
- Pedreiro (Mason)
- Pintor (Painter)
- Marceneiro (Carpenter)
- And more...

To apply seed data:

```bash
npx prisma db execute --file seed-categories.sql
```

## Environment Setup

### Required Environment Variables

```env
DATABASE_URL="postgresql://local_user:local_pass@localhost:5432/local_db?schema=public"
```

### Database Connection

The service automatically connects to PostgreSQL using the provided connection string. Make sure the database is running via Docker Compose:

```bash
docker-compose up -d
```

## Usage Examples

### Basic Category Operations

```typescript
import { databaseService, CategoryService } from '@libs/database';

// Initialize
const prisma = databaseService.prisma;
const categoryService = new CategoryService(prisma);

// Create root category
const rootCategory = await categoryService.create({
  name: 'Home Services',
  slug: 'home-services',
  description: 'Services for home maintenance and improvement',
});

// Create child category
const childCategory = await categoryService.create({
  name: 'Plumbing',
  slug: 'plumbing',
  description: 'Plumbing and water services',
  parentId: rootCategory.id,
});

// Get all active categories
const categories = await categoryService.findAll({
  includeChildren: true,
});

// Get hierarchy tree
const tree = await categoryService.getHierarchyTree();
```

### Hierarchy Validation

```typescript
// Validate before creating/updating
const validation = await categoryService.validateHierarchy(parentId, excludeId);

if (!validation.isValid) {
  throw new Error(validation.error);
}
```

### Soft Delete

```typescript
// Soft delete (set active = false)
await categoryService.softDelete(categoryId);

// Restore category
await categoryService.restore(categoryId);
```

## Performance Considerations

### Indexes

The following indexes are created for optimal performance:

- `categories_slug_key`: Unique index on slug for fast lookups
- `idx_categories_parent`: Index on parentId for hierarchy queries
- `idx_categories_active`: Index on active field for filtering

### Query Optimization

- Use `includeChildren` option sparingly for large hierarchies
- Implement pagination for large category lists
- Cache frequently accessed category trees
- Use `includeInactive: false` by default for public APIs

## Testing

### Unit Tests

```typescript
import { CategoryService } from '@libs/database';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  beforeEach(() => {
    categoryService = new CategoryService(mockPrisma);
  });

  it('should create category with valid data', async () => {
    const data = {
      name: 'Test Category',
      slug: 'test-category',
    };

    const result = await categoryService.create(data);
    expect(result.name).toBe(data.name);
  });
});
```

### Integration Tests

Use a test database for integration tests:

```typescript
// Setup test database
beforeAll(async () => {
  await databaseService.connect();
});

// Clean up after tests
afterAll(async () => {
  await databaseService.disconnect();
});
```

## Troubleshooting

### Common Issues

1. **Connection Errors**: Ensure PostgreSQL is running via Docker Compose
2. **Migration Failures**: Check database permissions and connection string
3. **Slug Conflicts**: Use unique slugs for each category
4. **Hierarchy Cycles**: Validate hierarchy before creating/updating

### Debug Mode

Enable Prisma query logging in development:

```typescript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```
