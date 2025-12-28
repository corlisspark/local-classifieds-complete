# 🚀 Running the Project

This document provides comprehensive instructions for running the Local Classifieds project in different scenarios.

> 💡 **Quick Reference**: For a condensed list of the most common commands, see [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

## 📋 Prerequisites

Before running the project, ensure you have:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Docker Desktop** (for database services)
- **Git** (for version control)

## 🎯 Quick Start

### Option 1: Start Everything (Recommended)

```bash
# Start Docker services + Backend + Frontend
npm run start:dev
```

### Option 2: Manual Start

```bash
# 1. Start Docker services
npm run docker:up

# 2. Start backend and frontend
npm run dev
```

## 🛠️ Development Commands

### Starting Services

| Command                | Description                                    | Ports      |
| ---------------------- | ---------------------------------------------- | ---------- |
| `npm run start:dev`    | Start everything (Docker + Backend + Frontend) | -          |
| `npm run dev`          | Start backend and frontend only                | 3000, 3001 |
| `npm run dev:api`      | Start backend only                             | 3000       |
| `npm run dev:frontend` | Start frontend only                            | 3001       |
| `npm run docker:up`    | Start Docker services only                     | 5432, 6379 |

### Workspace Management

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `npm install`            | Install all workspace dependencies |
| `npm run build`          | Build all workspaces               |
| `npm run build:api`      | Build API workspace only           |
| `npm run build:frontend` | Build frontend workspace only      |

### Stopping Services

| Command                 | Description                             |
| ----------------------- | --------------------------------------- |
| `npm run stop`          | Stop all development processes          |
| `npm run stop:all`      | Stop all processes with detailed status |
| `npm run stop:api`      | Stop backend only                       |
| `npm run stop:frontend` | Stop frontend only                      |
| `npm run stop:docker`   | Stop Docker services only               |
| `npm run stop:studio`   | Stop Prisma Studio instances            |

### Docker Management

| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npm run docker:up`      | Start Docker services    |
| `npm run docker:down`    | Stop Docker services     |
| `npm run docker:logs`    | View Docker service logs |
| `npm run docker:restart` | Restart Docker services  |

## 🌐 Accessing the Applications

Once running, you can access:

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 🔧 Development Workflow

### 1. First Time Setup

```bash
# Clone the repository
git clone <repository-url>
cd local-classifieds

# Install dependencies
npm install

# Start everything
npm run start:dev
```

### 2. Daily Development

```bash
# Start development environment
npm run start:dev

# Make your changes...

# Stop when done
npm run stop
```

### 3. Working on Specific Parts

```bash
# Backend only
npm run dev:api

# Frontend only
npm run dev:frontend

# Database management
npm run db:studio    # Open Prisma Studio (visual database browser)
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :3000
lsof -i :3001

# Stop all processes
npm run stop

# Or stop specific service
npm run stop:api
npm run stop:frontend
npm run stop:studio
```

### Docker Issues

```bash
# Check Docker status
docker ps

# Restart Docker services
npm run docker:restart

# View Docker logs
npm run docker:logs
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Restart database
npm run docker:down
npm run docker:up

# Generate Prisma client
npm run db:generate
```

## 📊 Service Status

### Check Running Services

```bash
# Check all ports
lsof -i :3000 -i :3001 -i :5432 -i :6379

# Check Docker containers
docker ps

# Check Node.js processes
ps aux | grep node
```

### Health Checks

```bash
# Test backend
curl http://localhost:3000

# Test frontend
curl http://localhost:3001

# Test database connection
npm run db:studio
```

## 🔄 Common Workflows

### Full Restart

```bash
npm run stop
npm run start:dev
```

### Backend Changes Only

```bash
npm run stop:api
npm run dev:api
```

### Frontend Changes Only

```bash
npm run stop:frontend
npm run dev:frontend
```

### Database Reset

```bash
npm run stop
npm run docker:down
npm run docker:up
npm run db:generate
npm run start:dev
```

## 📝 Environment Variables

### Backend (.env in apps/api/)

```env
DATABASE_URL="postgresql://local_user:local_pass@localhost:5432/local_db"
REDIS_URL="redis://localhost:6379"
PORT=3000
```

### Frontend (.env.local in apps/frontend/)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3001
```

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

### Start Production

```bash
npm run start
```

## 📚 Additional Resources

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./API.md)
- [Database Schema](./DATABASE.md)
- [Frontend Components](./FRONTEND.md)

## 🆘 Getting Help

If you encounter issues:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review the logs: `npm run docker:logs`
3. Check service status: `npm run stop:all`
4. Restart everything: `npm run stop && npm run start:dev`

---

**Happy coding! 🎉**
