#!/bin/bash

# Start script for Local Classifieds project
# This script starts all development processes

echo "🚀 Starting Local Classifieds development environment..."

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "⚠️  Docker is not running. Please start Docker Desktop first."
    echo "   Then run: npm run docker:up"
    exit 1
fi

# Start Docker services
echo "🐳 Starting Docker services..."
npm run docker:up

# Wait a moment for services to start
echo "⏳ Waiting for services to initialize..."
sleep 3

# Start backend and frontend
echo "🎯 Starting backend and frontend..."
npm run dev
