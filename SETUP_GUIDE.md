# Local Classifieds App - Setup Guide

## Overview
This is a full-stack marketplace/classifieds application built with NestJS (API), Next.js (Frontend), PostgreSQL (Database), and deployed on Railway.

## Live Application
- **Frontend**: https://frontend-production-9753.up.railway.app/
- **API**: https://api-production-58c2.up.railway.app/api/
- **Project**: resilient-manifestation (f24f3edd-d9e1-4189-9e56-086482c9fdf3)

## Architecture
- **Backend**: NestJS API with TypeScript
- **Frontend**: Next.js with React
- **Database**: PostgreSQL with Prisma ORM  
- **Deployment**: Railway cloud platform
- **Authentication**: JWT with bcrypt password hashing
- **Monorepo**: npm workspaces structure

## Database Schema
The application includes these core tables:
- **users** - User accounts with roles (CLIENT/PROVIDER/ADMIN)
- **providers** - Service provider profiles
- **clients** - Customer profiles  
- **services** - Marketplace services
- **categories** - Hierarchical service categories
- **client_favorites** - User favorites system
- **category_translations** - Multi-language support

## Prerequisites
- Node.js 18+
- npm 9+
- Railway CLI (`npm install -g @railway/cli`)
- PostgreSQL database

## Local Development Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd local-classifieds-master
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create `.env` files in both `apps/api/` and `apps/frontend/` with:

**API (.env)**:
```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-jwt-secret"
NODE_ENV="development"
```

**Frontend (.env.local)**:
```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Run migrations (creates all tables)
npm run db:migrate

# Optional: Run seeds if available
npm run db:seed
```

### 5. Start Development
```bash
# Start both API and frontend
npm run dev

# Or start individually
npm run dev:api     # API on http://localhost:3000
npm run dev:frontend # Frontend on http://localhost:3001
```

## Production Deployment (Railway)

### 1. Setup Railway Project
```bash
# Login to Railway
railway login

# Link to existing project or create new
railway link
```

### 2. Environment Variables
Set these in Railway dashboard:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `NODE_ENV=production`
- `FRONTEND_URL` - Frontend URL for CORS

### 3. Deploy Database Schema
```bash
# From apps/api directory
railway shell
DATABASE_URL="<external-db-url>" npm run db:deploy
```

### 4. Deploy Services
```bash
# Deploy API
railway up --service api

# Deploy Frontend  
railway up --service frontend
```

## Key Scripts

### Development
- `npm run dev` - Start both services
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript checking

### Database
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run migrations (dev)
- `npm run db:deploy` - Deploy migrations (prod)
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database

### Testing
- `npm run test` - Run tests
- `npm run test:e2e` - End-to-end tests

## Application Features

### User Management
- User registration/login
- Role-based access (Client/Provider/Admin)
- JWT authentication
- Password hashing with bcrypt

### Marketplace
- Service providers can create profiles
- Clients can browse and favorite providers
- Hierarchical service categories
- Multi-language category support
- Rating system for providers

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/categories` - List categories
- `GET /api/providers` - List service providers
- `GET /api/services` - List services

## Troubleshooting

### Database Connection Issues
If you get "table does not exist" errors:
```bash
# Check if migrations ran
railway variables | grep DATABASE_URL
DATABASE_URL="<external-url>" npm run db:deploy
```

### Build/Deploy Issues
```bash
# Clear and reinstall
npm run clean
npm install
npm run build
```

### Railway CLI Issues
```bash
# Re-authenticate
railway logout
railway login
railway link
```

## Technology Stack
- **Runtime**: Node.js 18+
- **Backend Framework**: NestJS
- **Frontend Framework**: Next.js 14
- **Database**: PostgreSQL
- **ORM**: Prisma 5.7
- **Authentication**: JWT + Passport
- **Validation**: Zod
- **Styling**: TailwindCSS
- **Deployment**: Railway
- **CI/CD**: GitHub Actions

## Support
For issues, check:
1. Database connection and migrations
2. Environment variables configuration  
3. Railway service status
4. Application logs in Railway dashboard

## Project Structure
```
local-classifieds-master/
├── apps/
│   ├── api/           # NestJS backend
│   └── frontend/      # Next.js frontend
├── libs/
│   └── database/      # Prisma schema and migrations
├── .github/           # CI/CD workflows
└── package.json       # Monorepo configuration
```