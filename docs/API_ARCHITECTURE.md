# 🔧 API Architecture - Local Classifieds

## 📋 Visão Geral

A API do Local Classifieds é construída com NestJS seguindo os princípios de Clean Architecture, Domain-Driven Design (DDD) e Repository Pattern. A arquitetura é modular, escalável e mantém separação clara de responsabilidades.

## 🏛️ Arquitetura em Camadas

### 1. 🌐 HTTP Layer (Controllers)

**Responsabilidade**: Gerenciar requisições HTTP, validação de entrada e formatação de resposta.

```typescript
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Query() query: CategoryQueryDto) {
    return this.categoriesService.findAll(query);
  }
}
```

**Características:**

- ✅ Decorators para roteamento
- ✅ Validação automática com DTOs
- ✅ Tratamento de erros centralizado
- ✅ Documentação automática (Swagger)

### 2. 🎯 Business Logic Layer (Services)

**Responsabilidade**: Implementar regras de negócio, orquestrar operações e validar dados.

```typescript
@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    // Validação de negócio
    await this.validateHierarchy(createCategoryDto.parentId);

    // Criação via repository
    const category = await this.categoryRepository.create(createCategoryDto);

    // Retorno como entidade de domínio
    return CategoryDomainEntity.fromPrisma(category);
  }
}
```

**Características:**

- ✅ Lógica de negócio isolada
- ✅ Validações complexas
- ✅ Orquestração de operações
- ✅ Transformação de dados

### 3. 🗄️ Data Access Layer (Repositories)

**Responsabilidade**: Encapsular operações de banco de dados e abstrair o ORM.

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
            data.translations?.map(translation => ({
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

**Características:**

- ✅ Encapsulamento do Prisma
- ✅ Queries otimizadas
- ✅ Transações gerenciadas
- ✅ Tipos seguros

### 4. 🏗️ Domain Layer (Entities)

**Responsabilidade**: Representar conceitos de negócio e regras de domínio.

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
    public readonly children: CategoryDomainEntity[] = []
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

**Características:**

- ✅ Lógica de domínio pura
- ✅ Propriedades computadas
- ✅ Imutabilidade
- ✅ Separação do ORM

## 📋 DTOs e Validação

### DTOs Específicos do Módulo

```typescript
// modules/categories/dto/create-category.dto.ts
export const CreateCategoryDto = z.object({
  slug: z.string().min(1).max(100),
  parentId: z.string().uuid().nullable().optional(),
  displayOrder: z.number().int().min(0).default(0),
  translations: z.array(translationSchema).min(1),
});

export type CreateCategoryDtoType = z.infer<typeof CreateCategoryDto>;
```

### DTOs Comuns (Cross-Module)

```typescript
// libs/shared/src/dto/common.dto.ts
export const PaginationDto = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

export const ApiResponseDto = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  timestamp: z.date().default(() => new Date()),
});
```

## 🔧 Configuração e Infraestrutura

### Configuração da Aplicação

```typescript
// config/app.config.ts
export const appConfig = {
  port: process.env.PORT || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  nodeEnv: process.env.NODE_ENV || 'development',
};
```

### Configuração do Database

```typescript
// config/database.config.ts
export const databaseConfig = {
  url: process.env.DATABASE_URL,
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS || '10'),
  connectionTimeout: parseInt(
    process.env.DATABASE_CONNECTION_TIMEOUT || '30000'
  ),
  queryTimeout: parseInt(process.env.DATABASE_QUERY_TIMEOUT || '30000'),
};
```

### Validação de Environment

```typescript
// config/validation.config.ts
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  API_PREFIX: z.string().default('api'),
  CORS_ORIGIN: z.string().default('*'),
});
```

## 🛡️ Segurança e Middleware

### Guards

```typescript
// common/guards/auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Implementação de autenticação
    return true;
  }
}
```

### Interceptors

```typescript
// common/interceptors/response.interceptor.ts
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date(),
      }))
    );
  }
}
```

### Exception Filters

```typescript
// common/filters/http-exception.filter.ts
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Tratamento centralizado de erros
  }
}
```

## 🧪 Estratégia de Testes

### Testes Unitários

```typescript
// modules/categories/__tests__/categories.service.spec.ts
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

### Testes de Integração

```typescript
// test/categories.e2e-spec.ts
describe('Categories (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/categories (POST)', () => {
    return request(app.getHttpServer())
      .post('/categories')
      .send({
        slug: 'test-category',
        displayOrder: 0,
        translations: [
          {
            language: 'pt',
            name: 'Categoria Teste',
            description: 'Descrição da categoria',
          },
        ],
      })
      .expect(201)
      .expect(res => {
        expect(res.body.success).toBe(true);
        expect(res.body.data.slug).toBe('test-category');
      });
  });
});
```

## 📊 Monitoramento e Logs

### Logging Estruturado

```typescript
// common/interceptors/logging.interceptor.ts
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
      })
    );
  }
}
```

### Health Checks

```typescript
// health/health.controller.ts
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

## 🚀 Performance e Otimização

### Cache Strategy

```typescript
// common/interceptors/cache.interceptor.ts
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly cacheManager: Cache) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = this.generateCacheKey(request);

    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    return next.handle().pipe(
      tap(async data => {
        await this.cacheManager.set(cacheKey, data, 300); // 5 minutes
      })
    );
  }
}
```

### Query Optimization

```typescript
// repositories/category.repository.ts
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

## 🔄 Padrões de Resposta

### Success Response

```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "category-slug",
    "name": "Category Name",
    "active": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response

```typescript
{
  "success": false,
  "message": "Validation failed",
  "error": "Bad Request",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/categories"
}
```

### Paginated Response

```typescript
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📈 Escalabilidade

### Horizontal Scaling

- **Load Balancer**: Distribuição de carga
- **Multiple Instances**: Múltiplas instâncias da API
- **Database Clustering**: Cluster PostgreSQL
- **Cache Layer**: Redis para cache distribuído

### Vertical Scaling

- **Resource Optimization**: Otimização de recursos
- **Query Optimization**: Otimização de queries
- **Connection Pooling**: Pool de conexões
- **Memory Management**: Gerenciamento de memória

## 🔒 Segurança

### Input Validation

- **Zod Schemas**: Validação de entrada
- **Sanitization**: Sanitização de dados
- **Type Safety**: Tipagem forte

### Authentication & Authorization

- **JWT Tokens**: Autenticação stateless
- **Role-based Access**: Controle de acesso baseado em roles
- **Rate Limiting**: Limitação de taxa
- **CORS**: Configuração de CORS

### Database Security

- **Parameterized Queries**: Queries parametrizadas
- **Connection Encryption**: Conexões criptografadas
- **Access Control**: Controle de acesso
- **Audit Logging**: Log de auditoria

---

## 📚 Recursos Adicionais

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Zod Documentation](https://zod.dev/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
