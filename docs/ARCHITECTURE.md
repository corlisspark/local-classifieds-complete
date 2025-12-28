# 🏗️ Local Classifieds - Arquitetura Completa

## 📋 Visão Geral

O Local Classifieds é uma plataforma de classificados locais construída com uma arquitetura moderna, escalável e profissional. O projeto utiliza um monorepo com separação clara entre frontend e backend, seguindo as melhores práticas de desenvolvimento.

## 🎯 Stack Tecnológico

### Backend (API)

- **Framework**: NestJS
- **Linguagem**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Testes**: Jest
- **Validação**: Zod
- **Arquitetura**: Modular Clean Architecture

### Frontend

- **Framework**: Next.js (App Router)
- **Linguagem**: TypeScript + React
- **Styling**: TailwindCSS
- **Testes**: React Testing Library + Jest
- **SEO**: Server Side Rendering (SSR)
- **i18n**: Internacionalização

### Infraestrutura

- **Containerização**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (frontend), Railway/Render (backend)
- **Database**: PostgreSQL via Docker

## 🏛️ Arquitetura em Camadas

### 1. 🌐 Frontend Layer (Next.js)

```
apps/frontend/src/
├── app/                    # App Router (Next.js 13+)
│   ├── [locale]/          # Internacionalização
│   │   ├── (admin)/       # Grupo de rotas administrativas
│   │   │   ├── dashboard/ # Dashboard principal
│   │   │   ├── users/     # Gerenciamento de usuários
│   │   │   └── categories/ # Gerenciamento de categorias
│   │   ├── (marketing)/   # Grupo de rotas de marketing
│   │   │   ├── home/      # Página inicial
│   │   │   ├── about/     # Sobre nós
│   │   │   └── components-demo/ # Demonstração de componentes
│   │   ├── layout.tsx     # Layout com sidebar
│   │   └── page.tsx       # Página inicial
│   ├── providers/         # Context/Providers globais
│   │   ├── ThemeProvider.tsx
│   │   ├── I18nProvider.tsx
│   │   ├── QueryProvider.tsx
│   │   └── index.ts
│   ├── globals.css        # Estilos globais
│   └── layout.tsx         # Layout raiz
├── components/            # Componentes React
│   ├── ui/               # Design System completo
│   │   ├── Button.tsx    # Botão reutilizável
│   │   ├── Select.tsx    # Select com validação
│   │   ├── Modal.tsx     # Modal responsivo
│   │   ├── Spinner.tsx   # Loading states
│   │   ├── Form.tsx      # Form system
│   │   ├── Table.tsx     # Table component
│   │   ├── Toast.tsx     # Toast notifications
│   │   ├── Dropdown.tsx  # Dropdown menu
│   │   └── index.ts      # Exports centralizados
│   └── LanguageSwitcher.tsx
├── hooks/                # Custom Hooks
│   └── useTranslations.ts
├── i18n/                 # Arquivos de tradução
│   ├── en/              # Inglês
│   └── pt/              # Português
├── services/             # Camada de API
│   ├── api.ts           # Cliente API base
│   ├── categories.ts    # Serviço de categorias
│   ├── users.ts         # Serviço de usuários
│   └── listings.ts      # Serviço de anúncios
├── utils/                # Utilitários
│   └── cn.ts            # Class name helper
├── __tests__/           # Estrutura de testes
│   ├── components/      # Testes de componentes
│   ├── hooks/          # Testes de hooks
│   └── pages/          # Testes de páginas
└── middleware.ts         # Middleware do Next.js
```

**Características:**

- ✅ App Router com roteamento baseado em arquivos
- ✅ Grupos de rotas para organização modular
- ✅ Internacionalização (i18n) integrada
- ✅ Design System completo e consistente
- ✅ Providers globais (Theme, I18n, Query)
- ✅ Camada de Data Fetching com services
- ✅ Componentes reutilizáveis e tipados
- ✅ Responsive design com TailwindCSS
- ✅ Estrutura de testes organizada

### 2. 🔧 API Layer (NestJS)

```
apps/api/src/
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

**Características:**

- ✅ Arquitetura modular com separação clara
- ✅ Repository Pattern para acesso a dados
- ✅ DTOs com validação Zod
- ✅ Entidades de domínio puras
- ✅ Testes unitários abrangentes

### 3. 🗄️ Data Access Layer

```
apps/api/libs/database/src/
├── repositories/        # Repository Pattern
│   └── category.repository.ts
├── prisma.service.ts   # Serviço Prisma
├── database.service.ts # Serviço de database
├── database.module.ts  # Módulo de database
└── types.ts           # Tipos customizados
```

**Características:**

- ✅ Repository Pattern encapsulando Prisma
- ✅ Tipos TypeScript seguros
- ✅ Queries otimizadas
- ✅ Transações gerenciadas

### 4. 📚 Shared Libraries

```
libs/
├── database/           # Infraestrutura de dados
│   ├── prisma/        # Schema e migrações
│   └── src/           # Serviços e repositories
└── shared/            # Código compartilhado
    └── src/
        ├── dto/       # DTOs cross-module
        ├── types/     # Tipos compartilhados
        ├── constants/ # Constantes
        └── utils/     # Utilitários
```

## 🎯 Padrões de Design Implementados

### 1. **Repository Pattern**

```typescript
@Injectable()
export class CategoryRepository {
  async create(data: CreateCategoryData): Promise<Category> {
    // Encapsula operações Prisma
  }

  async findById(id: string): Promise<Category | null> {
    // Queries otimizadas
  }
}
```

### 2. **Domain Entities**

```typescript
export class CategoryDomainEntity {
  constructor(
    public readonly id: string,
    public readonly slug: string
    // ... outros campos
  ) {}

  get name(): string {
    return this.translations[0]?.name || this.slug;
  }

  get isParent(): boolean {
    return this.children.length > 0;
  }
}
```

### 3. **DTOs com Validação**

```typescript
export const CreateCategoryDto = z.object({
  slug: z.string().min(1).max(100),
  parentId: z.string().uuid().nullable().optional(),
  displayOrder: z.number().int().min(0).default(0),
  translations: z.array(translationSchema).min(1),
});
```

### 4. **Modular Architecture**

```typescript
@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
```

## 🔄 Fluxo de Dados

```
1. 📱 Frontend Request (Next.js)
   ↓
2. 🌐 HTTP Controller (NestJS)
   ↓
3. 🧠 Service (Business Logic)
   ↓
4. 🗄️ Repository (Data Access)
   ↓
5. 🐘 Database (PostgreSQL)
   ↓
6. 📊 Response (DTOs)
   ↓
7. 📱 Frontend Display
```

## 🛠️ Scripts de Desenvolvimento

### Desenvolvimento

```bash
# Iniciar tudo (DB + API + Frontend)
npm run dev:all

# Iniciar apenas API
npm run dev:api

# Iniciar apenas Frontend
npm run dev:frontend

# Iniciar apenas Database
npm run dev:db
```

### Database

```bash
# Gerar cliente Prisma
npm run db:generate

# Executar migrações
npm run db:migrate:dev

# Abrir Prisma Studio
npm run db:studio:dev

# Reset do banco
npm run db:reset
```

### Qualidade de Código

```bash
# Lint
npm run lint

# Formatação
npm run format

# Verificação de tipos
npm run type-check

# Testes
npm run test

# Build
npm run build
```

## 🧪 Estratégia de Testes

### Backend

- **Unit Tests**: Services e Controllers
- **Integration Tests**: Repositories e Database
- **E2E Tests**: Fluxos completos

### Frontend

- **Component Tests**: React Testing Library
- **Integration Tests**: Páginas e fluxos
- **Visual Tests**: Storybook (futuro)

## 📊 Monitoramento e Observabilidade

### Logs

- Estruturados com contexto
- Níveis configuráveis
- Integração com serviços externos

### Métricas

- Performance de queries
- Tempo de resposta da API
- Uso de recursos

### Health Checks

- Database connectivity
- External services
- System resources

## 🚀 Deploy e CI/CD

### Pipeline

1. **Lint & Format**: Verificação de código
2. **Type Check**: Verificação de tipos
3. **Tests**: Execução de testes
4. **Build**: Compilação
5. **Deploy**: Deploy automático

### Ambientes

- **Development**: Local com Docker
- **Staging**: Preview deployments
- **Production**: Deploy automático

## 🔒 Segurança

### API

- Validação de entrada com Zod
- Rate limiting
- CORS configurado
- Headers de segurança

### Database

- Conexões seguras
- Queries parametrizadas
- Backup automático

## 📈 Escalabilidade

### Horizontal

- Load balancers
- Multiple instances
- Database clustering

### Vertical

- Resource optimization
- Query optimization
- Caching strategies

## 🎯 Próximos Passos

1. **Autenticação**: JWT + Refresh tokens
2. **Cache**: Redis para performance
3. **Search**: Elasticsearch para busca
4. **File Upload**: S3 para arquivos
5. **Real-time**: WebSockets para notificações
6. **Monitoring**: APM e logging centralizado

---

## 📚 Documentação Adicional

- [API Architecture](./API_ARCHITECTURE.md) - Detalhes da API
- [Quick Reference](./QUICK_REFERENCE.md) - Comandos rápidos
- [Running Guide](./RUNNING.md) - Como executar o projeto
- [VS Code Setup](./VSCODE_SETUP.md) - Configuração do editor
