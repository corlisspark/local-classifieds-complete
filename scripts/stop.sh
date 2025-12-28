#!/bin/bash

# Stop script for Local Classifieds project
# This script stops all running development processes

echo "🛑 Stopping Local Classifieds development processes..."

# Stop NestJS backend processes
echo "📡 Stopping NestJS backend..."
pkill -f "nest start" 2>/dev/null || echo "   No NestJS processes found"

# Stop Next.js frontend processes  
echo "🌐 Stopping Next.js frontend..."
pkill -f "next dev" 2>/dev/null || echo "   No Next.js processes found"

# Stop any Node.js processes running our main files
echo "⚙️  Stopping Node.js processes..."
pkill -f "node.*main" 2>/dev/null || echo "   No Node.js main processes found"

# Stop Prisma Studio processes
echo "🗄️  Stopping Prisma Studio..."
pkill -f "prisma studio" 2>/dev/null || echo "   No Prisma Studio processes found"

# Stop Docker services (optional - uncomment if needed)
# echo "🐳 Stopping Docker services..."
# docker-compose down 2>/dev/null || echo "   No Docker services running"

# Check if processes are still running
echo ""
echo "🔍 Checking for remaining processes..."

# Check ports
if lsof -i :3000 >/dev/null 2>&1; then
    echo "   ⚠️  Port 3000 still in use"
    lsof -i :3000
else
    echo "   ✅ Port 3000 is free"
fi

if lsof -i :3001 >/dev/null 2>&1; then
    echo "   ⚠️  Port 3001 still in use"
    lsof -i :3001
else
    echo "   ✅ Port 3001 is free"
fi

# Check Prisma Studio ports (5555-5559 range)
echo "🔍 Checking Prisma Studio ports..."
for port in {5555..5559}; do
    if lsof -i :$port >/dev/null 2>&1; then
        echo "   ⚠️  Port $port (Prisma Studio) still in use"
        lsof -i :$port
    else
        echo "   ✅ Port $port is free"
    fi
done

echo ""
echo "🎉 Stop script completed!"
echo ""
echo "💡 To restart everything:"
echo "   npm run dev"
echo ""
echo "💡 To start individual services:"
echo "   npm run dev:api      # Backend only"
echo "   npm run dev:frontend # Frontend only"
echo "   npm run docker:up    # Docker services only"
