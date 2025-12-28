# Category API - Postman Collection

This Postman collection provides testing for the Category API endpoints.

## 📁 Files

- `Category API.postman_collection.json` - Main collection with all API endpoints
- `Local Development.postman_environment.json` - Environment variables for local development
- `README.md` - This documentation file

## 🚀 Setup

### 1. Import Collection and Environment

1. Open Postman
2. Click **Import** button
3. Import both files:
   - `Category API.postman_collection.json`
   - `Local Development.postman_environment.json`

### 2. Select Environment

1. In Postman, select **"Local Development"** environment from the dropdown
2. Verify the `baseUrl` is set to `http://localhost:3000`

### 3. Start Your API Server

Make sure your NestJS API server is running on port 3000:

```bash
cd apps/api
npm run start:dev
```

## 📋 Collection Structure

### Categories

Main CRUD operations for categories:

- **Create Category** - Create a new category with translations
- **Get All Categories** - Get all active categories
- **Get Category by ID** - Get a specific category by ID
- **Update Category** - Update category information
- **Delete Category** - Soft delete a category

## 🔧 Environment Variables

The collection uses these environment variables:

| Variable       | Description                | Default Value           |
| -------------- | -------------------------- | ----------------------- |
| `baseUrl`      | API base URL               | `http://localhost:3000` |
| `categoryId`   | Auto-extracted category ID | (empty)                 |
| `categorySlug` | Category slug for testing  | `plumber`               |

## 🎯 Key Features

### Auto-Extraction

The collection automatically extracts and sets the `categoryId` variable when you create a category, making it easy to test subsequent operations.

## 📝 Example Usage

### 1. Create a Category

```json
{
  "slug": "plumber",
  "displayOrder": 10,
  "translations": [
    {
      "language": "pt",
      "name": "Encanador",
      "description": "Serviços de hidráulica e encanamentos"
    },
    {
      "language": "en",
      "name": "Plumber",
      "description": "Plumbing and water services"
    }
  ]
}
```

## 🧪 Testing Workflow

1. **Start with Create Operations**
   - Create a category
   - Note the auto-extracted ID

2. **Test Read Operations**
   - Get all categories
   - Get specific category by ID

3. **Test Update Operations**
   - Update category information

4. **Test Delete Operations**
   - Soft delete category

## 🔍 Response Examples

### Successful Category Creation

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "slug": "plumber",
  "displayOrder": 10,
  "active": true,
  "createdAt": "2025-09-26T22:30:00.000Z",
  "updatedAt": "2025-09-26T22:30:00.000Z",
  "translations": [
    {
      "language": "pt",
      "name": "Encanador",
      "description": "Serviços de hidráulica e encanamentos"
    }
  ]
}
```

---

Happy testing! 🎉
