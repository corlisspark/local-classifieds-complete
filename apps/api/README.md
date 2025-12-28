# 🔧 Local Classifieds API

> API backend construída com NestJS, TypeScript e Prisma

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## 📋 Visão Geral

A API do Local Classifieds é construída seguindo os princípios de Clean Architecture, Domain-Driven Design (DDD) e Repository Pattern. A arquitetura é modular, escalável e mantém separação clara de responsabilidades.

### ✨ Características

- 🏗️ **Arquitetura Modular**: Separação clara de responsabilidades
- 🎯 **Domain-Driven Design**: Entidades de domínio puras
- 🗄️ **Repository Pattern**: Abstração da camada de dados
- 🔒 **Validação Robusta**: DTOs com validação Zod
- 🧪 **Testes Abrangentes**: Unit, integration e e2e tests
- 📊 **Monitoramento**: Logs estruturados e health checks
- 🚀 **Performance**: Queries otimizadas e cache strategy

## 🏛️ Arquitetura

### Camadas da Aplicação

```
┌─────────────────────────────────────────────────────────────┐
│                    🌐 HTTP Layer                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Controllers   │  │   Middleware    │  │   Guards     │ │
│  │                 │  │                 │  │              │ │
│  │ • Categories    │  │ • CORS          │  │ • Auth       │ │
│  │ • Validation    │  │ • Logging       │  │ • Roles      │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                  🎯 Business Logic Layer                    │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │    Services     │  │   Interceptors  │  │   Entities   │ │
│  │                 │  │                 │  │              │ │
│  │ • Categories    │  │ • Transform     │  │ • Domain     │ │
│  │ • Business      │  │ • Logging       │  │ • Pure Logic │ │
│  │   Rules         │  │ • Cache         │  │ • Computed   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                  🗄️ Data Access Layer                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  Repositories   │  │   Database      │  │   Types      │ │
│  │                 │  │   Services      │  │              │ │
│  │ • Category      │  │ • Prisma        │  │ • DTOs       │ │
│  │ • CRUD Ops      │  │ • Connection    │  │ • Entities   │ │
│  │ • Queries       │  │ • Transactions  │  │ • Schemas    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    🐘 Database Layer                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   PostgreSQL    │  │   Prisma        │  │   Migrations │ │
│  │                 │  │   ORM           │  │              │ │
│  │ • Categories    │  │ • Schema        │  │ • Version    │ │
│  │ • Translations  │  │ • Client        │  │   Control    │ │
│  │ • Relations     │  │ • Queries       │  │ • Rollback   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Estrutura de Diretórios

```
src/
├── modules/              # Módulos de funcionalidades
│   └── categories/       # Módulo de categorias
│       ├── dto/         # Data Transfer Objects
│       │   ├── create-category.dto.ts
│       │   ├── update-category.dto.ts
│       │   └── category-query.dto.ts
│       ├── entities/    # Entidades de domínio
│       │   └── category.entity.ts
│       ├── __tests__/   # Testes unitários
│       ├── categories.controller.ts
│       ├── categories.service.ts
│       └── categories.module.ts
├── common/              # Utilitários compartilhados
│   ├── guards/         # Guards de autenticação
│   ├── filters/        # Exception filters
│   ├── interceptors/   # Response interceptors
│   ├── decorators/     # Custom decorators
│   └── pipes/          # Validation pipes
├── config/             # Configurações
│   ├── app.config.ts
│   ├── database.config.ts
│   └── validation.config.ts
└── main.ts             # Entry point
```

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm 9+
- PostgreSQL 15+
- Docker (opcional)

### Instalação

1. **Instale as dependências**

```bash
npm install
```

2. **Configure as variáveis de ambiente**

```bash
cp env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Execute as migrações**

```bash
npm run db:migrate:dev
```

4. **Inicie o servidor**

```bash
npm run start:dev
```

### URLs de Desenvolvimento

- **API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/health
- **Prisma Studio**: http://localhost:5555

## 📚 API Endpoints

### Categories

#### Listar Categorias

```http
GET /api/categories
```

**Query Parameters:**

- `includeChildren` (boolean): Incluir categorias filhas
- `includeInactive` (boolean): Incluir categorias inativas
- `parentId` (string): Filtrar por categoria pai
- `limit` (number): Limite de resultados
- `offset` (number): Offset para paginação

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "category-slug",
      "name": "Category Name",
      "active": true,
      "displayOrder": 0,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "translations": [
        {
          "id": "uuid",
          "language": "pt",
          "name": "Nome da Categoria",
          "description": "Descrição da categoria"
        }
      ]
    }
  ],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Buscar Categoria por ID

```http
GET /api/categories/:id
```

#### Buscar Categoria por Slug

```http
GET /api/categories/slug/:slug
```

#### Criar Categoria

```http
POST /api/categories
```

**Request Body:**

```json
{
  "slug": "category-slug",
  "parentId": "uuid-or-null",
  "displayOrder": 0,
  "translations": [
    {
      "language": "pt",
      "name": "Nome da Categoria",
      "description": "Descrição da categoria"
    }
  ]
}
```

#### Atualizar Categoria

```http
PUT /api/categories/:id
```

#### Deletar Categoria (Soft Delete)

```http
DELETE /api/categories/:id
```

#### Restaurar Categoria

```http
POST /api/categories/:id/restore
```

#### Obter Hierarquia

```http
GET /api/categories/hierarchy
```

#### Obter Estatísticas

```http
GET /api/categories/stats
```

**Response:**

```json
{
  "success": true,
  "data": {
    "total": 100,
    "active": 95,
    "inactive": 5,
    "withChildren": 20
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🛠️ Scripts de Desenvolvimento

### Desenvolvimento

```bash
npm run start:dev    # Iniciar em modo desenvolvimento
npm run start:debug  # Iniciar com debug
npm run start:prod   # Iniciar em produção
```

### Database

```bash
npm run db:generate     # Gerar cliente Prisma
npm run db:migrate:dev  # Executar migrações
npm run db:studio:dev   # Abrir Prisma Studio
npm run db:reset        # Reset do banco
npm run db:seed         # Seed do banco
npm run db:deploy       # Deploy das migrações
```

### Qualidade de Código

```bash
npm run lint        # Lint
npm run format      # Formatação
npm run type-check  # Verificação de tipos
npm run test        # Testes unitários
npm run test:e2e    # Testes end-to-end
npm run test:cov    # Coverage dos testes
npm run build       # Build
```

## 🧪 Testes

### Estrutura de Testes

```
src/
├── modules/categories/__tests__/
│   ├── categories.controller.spec.ts
│   └── categories.service.spec.ts
└── test/
    └── app.e2e-spec.ts
```

### Executando Testes

```bash
# Testes unitários
npm run test

# Testes com watch mode
npm run test:watch

# Testes end-to-end
npm run test:e2e

# Coverage
npm run test:cov
```

### Exemplo de Teste

```typescript
describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoryRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should create a category', async () => {
    const createData = { slug: 'test', displayOrder: 0 };
    const expectedCategory = { id: '1', ...createData };

    jest.spyOn(repository, 'create').mockResolvedValue(expectedCategory);

    const result = await service.create(createData);
    expect(result).toEqual(expectedCategory);
    expect(repository.create).toHaveBeenCalledWith(createData);
  });
});
```

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# Aplicação
NODE_ENV=development
PORT=3000
API_PREFIX=api
CORS_ORIGIN=*

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/local_classifieds
DATABASE_MAX_CONNECTIONS=10
DATABASE_CONNECTION_TIMEOUT=30000
DATABASE_QUERY_TIMEOUT=30000

# Logging
LOG_LEVEL=debug
LOG_FORMAT=json
```

### Configuração do Prisma

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Category {
  id           String   @id @default(cuid())
  slug         String   @unique
  parentId     String?
  displayOrder Int      @default(0)
  active       Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  parent       Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children     Category[] @relation("CategoryHierarchy")
  translations CategoryTranslation[]

  @@map("categories")
}
```

## 🎯 Padrões de Design

### Repository Pattern

```typescript
@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryData): Promise<Category> {
    return this.prisma.category.create({
      data: {
        slug: data.slug,
        parentId: data.parentId,
        displayOrder: data.displayOrder,
        active: data.active ?? true,
        translations: {
          create:
            data.translations?.map((translation) => ({
              language: translation.language,
              name: translation.name,
              description: translation.description,
            })) || [],
        },
      },
      include: {
        translations: true,
        parent: true,
        children: true,
      },
    });
  }
}
```

### Domain Entities

```typescript
export class CategoryDomainEntity {
  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly parentId: string | null,
    public readonly displayOrder: number,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly translations: CategoryTranslation[] = [],
    public readonly parent: CategoryDomainEntity | null = null,
    public readonly children: CategoryDomainEntity[] = [],
  ) {}

  get name(): string {
    return this.translations[0]?.name || this.slug;
  }

  get isParent(): boolean {
    return this.children.length > 0;
  }

  get fullPath(): string {
    if (this.parent) {
      return `${this.parent.fullPath} > ${this.name}`;
    }
    return this.name;
  }
}
```

### DTOs com Validação

```typescript
export const CreateCategoryDto = z.object({
  slug: z.string().min(1).max(100),
  parentId: z.string().uuid().nullable().optional(),
  displayOrder: z.number().int().min(0).default(0),
  translations: z.array(translationSchema).min(1),
});

export type CreateCategoryDtoType = z.infer<typeof CreateCategoryDto>;
```

## 📊 Monitoramento

### Health Checks

```typescript
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new ServiceUnavailableException('Database connection failed');
    }
  }
}
```

### Logging Estruturado

```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;
    const now = Date.now();

    this.logger.log(`Incoming ${method} ${url}`, {
      method,
      url,
      body: this.sanitizeBody(body),
      timestamp: new Date().toISOString(),
    });

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const duration = Date.now() - now;

        this.logger.log(`Outgoing ${method} ${url} ${statusCode}`, {
          method,
          url,
          statusCode,
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
        });
      }),
    );
  }
}
```

## 🚀 Deploy

### Build para Produção

```bash
npm run build
npm run start:prod
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### Variáveis de Ambiente de Produção

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/database
API_PREFIX=api
CORS_ORIGIN=https://yourdomain.com
```

## 🔒 Segurança

### Validação de Entrada

- **Zod Schemas**: Validação robusta de DTOs
- **Sanitization**: Sanitização de dados de entrada
- **Type Safety**: Tipagem forte em toda a aplicação

### Autenticação e Autorização

- **JWT Tokens**: Autenticação stateless
- **Role-based Access**: Controle de acesso baseado em roles
- **Rate Limiting**: Limitação de taxa de requisições
- **CORS**: Configuração de CORS adequada

### Segurança do Database

- **Parameterized Queries**: Queries parametrizadas
- **Connection Encryption**: Conexões criptografadas
- **Access Control**: Controle de acesso ao banco
- **Audit Logging**: Log de auditoria

## 📈 Performance

### Otimizações de Query

```typescript
async findAll(options: CategoryQueryOptions = {}): Promise<CategoryWithChildren[]> {
  const include: Prisma.CategoryInclude = {
    translations: options.includeTranslations ?? true,
    parent: options.includeParent ?? false,
    children: options.includeChildren ?? false,
  };

  const where: Prisma.CategoryWhereInput = {
    active: options.includeInactive ? undefined : true,
    parentId: options.parentId,
  };

  return this.prisma.category.findMany({
    where,
    include,
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    take: options.limit,
    skip: options.offset,
  });
}
```

### Cache Strategy

```typescript
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly cacheManager: Cache) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = this.generateCacheKey(request);

    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    return next.handle().pipe(
      tap(async (data) => {
        await this.cacheManager.set(cacheKey, data, 300); // 5 minutes
      }),
    );
  }
}
```

## 🐛 Troubleshooting

### Problemas Comuns

#### Database Connection Failed

```bash
# Verificar se o banco está rodando
docker ps

# Verificar variáveis de ambiente
cat .env

# Testar conexão
npm run db:studio:dev
```

#### TypeScript Errors

```bash
# Verificar tipos
npm run type-check

# Regenerar tipos do Prisma
npm run db:generate

# Limpar cache
rm -rf node_modules/.cache
```

#### Build Errors

```bash
# Limpar build anterior
rm -rf dist

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Build novamente
npm run build
```

## 📚 Recursos Adicionais

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Zod Documentation](https://zod.dev/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

<div align="center">
  <p>Feito com ❤️ pela equipe Local Classifieds</p>
</div>
