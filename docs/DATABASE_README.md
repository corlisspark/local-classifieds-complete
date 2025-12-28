# Database Documentation

## 📋 Overview

Este diretório contém toda a documentação relacionada ao banco de dados do sistema de classificados locais.

## 📁 Files

- **`DATABASE_SCHEMA.md`** - Documentação completa do esquema do banco de dados
- **`database-diagram.mmd`** - Diagrama ER em formato Mermaid para visualização

## 🗄️ Database Schema

### Core Entities

1. **User** - Usuários do sistema (CLIENT, PROVIDER, ADMIN)
2. **Provider** - Prestadores de serviço
3. **Client** - Clientes que contratam serviços
4. **Service** - Serviços oferecidos
5. **Category** - Categorias hierárquicas
6. **CategoryTranslation** - Traduções das categorias
7. **ClientFavorite** - Favoritos dos clientes

### Key Features

- ✅ **UUID Primary Keys** - Escalabilidade e segurança
- ✅ **Hierarchical Categories** - Categorias pai/filho
- ✅ **Multi-language Support** - Traduções em pt-BR, en-US, pt-PT
- ✅ **Soft Delete Ready** - Campo `active` para desativação
- ✅ **Performance Indexes** - Índices otimizados para consultas
- ✅ **Audit Trail** - Timestamps de criação e atualização
- ✅ **Favorites System** - Sistema de favoritos com tabela intermediária

## 🔗 Relationships

```
User (1:1) Provider
User (1:1) Client
Provider (1:N) Service
Category (1:N) Service
Category (1:N) Category (hierarquia)
Category (1:N) CategoryTranslation
Client (N:N) Provider (via ClientFavorites)
Provider (N:N) Category (especialização)
```

## 📊 Performance

### Indexes

- Primary keys (UUIDs)
- Foreign keys
- Unique constraints (email, document, slug)
- Composite indexes for common queries
- Performance indexes for categories

### Query Optimization

- Use `active = true` for public listings
- Order by `displayOrder` for categories
- Filter by `status = 'ACTIVE'` for services
- Use pagination with `LIMIT/OFFSET`

## 🚀 Getting Started

### Prerequisites

- PostgreSQL 13+
- Docker (for local development)

### Local Development

```bash
# Start database
docker-compose up -d

# Run migrations
cd apps/api/libs/database
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

### Environment Variables

```bash
DATABASE_URL="postgresql://local_user:local_pass@localhost:5432/local_db?schema=public"
```

## 📈 Migration History

1. **Initial Categories** - Base category system
2. **Translations** - Multi-language support
3. **Performance Indexes** - Query optimization
4. **Core Models** - User, Provider, Client, Service
5. **Favorites & Fixes** - Improved data modeling

## 🔮 Future Enhancements

- [ ] Soft delete with `deletedAt`
- [ ] Audit trail with `createdBy`/`updatedBy`
- [ ] Caching strategy (Redis)
- [ ] Archive system for old data
- [ ] Regional partitioning
- [ ] Read replicas for scaling

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Database Design Best Practices](https://www.postgresql.org/docs/current/ddl.html)

## 🤝 Contributing

When making changes to the database schema:

1. Update the Prisma schema
2. Generate and test migrations
3. Update this documentation
4. Update the ER diagram if needed
5. Test with sample data

---

**Last Updated**: September 28, 2024  
**Schema Version**: 5 (with favorites and improvements)
