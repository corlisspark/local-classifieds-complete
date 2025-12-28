# 🎨 Frontend Architecture - Local Classifieds

## 📋 Visão Geral

O frontend do Local Classifieds é construído com Next.js 13+ utilizando App Router, TypeScript, TailwindCSS e um design system completo. A arquitetura é modular, escalável e otimizada para performance e SEO, seguindo as melhores práticas de desenvolvimento moderno.

## 🏗️ Estrutura de Diretórios Refinada

```
apps/frontend/src/
├── app/                    # App Router (Next.js 13+)
│   ├── [locale]/          # Internacionalização
│   │   ├── (admin)/       # Grupo de rotas administrativas
│   │   │   ├── dashboard/ # Dashboard principal
│   │   │   │   └── page.tsx
│   │   │   ├── users/     # Gerenciamento de usuários
│   │   │   │   └── page.tsx
│   │   │   └── categories/ # Gerenciamento de categorias
│   │   │       └── page.tsx
│   │   ├── (marketing)/   # Grupo de rotas de marketing
│   │   │   ├── home/      # Página inicial
│   │   │   │   └── page.tsx
│   │   │   ├── about/     # Sobre nós
│   │   │   │   └── page.tsx
│   │   │   └── components-demo/ # Demonstração de componentes
│   │   │       └── page.tsx
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
│   │   ├── Card.tsx      # Card component
│   │   ├── Input.tsx     # Input component
│   │   ├── Badge.tsx     # Badge component
│   │   ├── Typography.tsx # Typography system
│   │   ├── Stack.tsx     # Layout component
│   │   ├── Divider.tsx   # Divider component
│   │   ├── Sidebar.tsx   # Sidebar navigation
│   │   ├── Form.tsx      # Form system
│   │   ├── Table.tsx     # Table component
│   │   ├── Toast.tsx     # Toast notifications
│   │   ├── Dropdown.tsx  # Dropdown menu
│   │   └── index.ts      # Exports centralizados
│   └── LanguageSwitcher.tsx # Seletor de idioma
├── hooks/                # Custom Hooks
│   └── useTranslations.ts # Hook de tradução
├── i18n/                 # Arquivos de tradução
│   ├── en/              # Inglês
│   │   ├── common.json
│   │   └── admin.json
│   └── pt/              # Português
│       ├── common.json
│       └── admin.json
├── services/             # Camada de API
│   ├── api.ts           # Cliente API base
│   ├── categories.ts    # Serviço de categorias
│   ├── users.ts         # Serviço de usuários
│   ├── listings.ts      # Serviço de anúncios
│   └── index.ts         # Exports centralizados
├── utils/                # Utilitários
│   └── cn.ts            # Class name helper
├── __tests__/           # Estrutura de testes
│   ├── components/      # Testes de componentes
│   ├── hooks/          # Testes de hooks
│   └── pages/          # Testes de páginas
└── middleware.ts         # Middleware do Next.js
```

## 🎯 Melhorias Implementadas

### 1. **Organização de Features com Grupos de Rotas**

#### Antes (Estrutura Linear)

```
app/[locale]/
├── admin/
├── components-demo/
└── page.tsx
```

#### Depois (Grupos de Rotas)

```
app/[locale]/
├── (admin)/           # Grupo administrativo
│   ├── dashboard/
│   ├── users/
│   └── categories/
├── (marketing)/       # Grupo de marketing
│   ├── home/
│   ├── about/
│   └── components-demo/
└── page.tsx
```

**Benefícios:**

- ✅ Organização clara por funcionalidade
- ✅ Layouts específicos por grupo
- ✅ Escalabilidade para novas features
- ✅ Separação de responsabilidades

### 2. **Design System Completo**

#### Componentes Base

- **Button**: Botão reutilizável com variantes
- **Select**: Select com validação
- **Modal**: Modal responsivo
- **Spinner**: Loading states
- **Card**: Card component
- **Input**: Input com validação
- **Badge**: Badge component
- **Typography**: Sistema de tipografia
- **Stack**: Componente de layout
- **Divider**: Divider component
- **Sidebar**: Sidebar navigation

#### Componentes Avançados

- **Form**: Sistema completo de formulários
- **Table**: Tabela com sorting e paginação
- **Toast**: Notificações toast
- **Dropdown**: Menu dropdown

### 3. **Camada de Providers**

#### ThemeProvider

```typescript
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Gerenciamento de tema com suporte a system preference
  // Persistência no localStorage
  // Aplicação automática de classes CSS
}
```

#### I18nProvider

```typescript
export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [translations, setTranslations] = useState<Record<string, any>>({});

  // Carregamento dinâmico de traduções
  // Fallback para inglês
  // Suporte a namespaces
}
```

#### QueryProvider

```typescript
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error) => {
          // Não retry em erros 4xx
          if (error?.status >= 400 && error?.status < 500) return false;
          return failureCount < 3;
        },
      },
    },
  });
}
```

### 4. **Camada de Data Fetching**

#### API Client Base

```typescript
class ApiClient {
  private baseURL: string;

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    // Implementação com tratamento de erros
    // Headers automáticos
    // Validação de resposta
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    // Implementação para POST
  }
}
```

#### Services Específicos

```typescript
export class CategoriesService {
  private basePath = '/categories';

  async getAll(params?: CategoryQueryParams): Promise<Category[]> {
    return apiClient.get<Category[]>(this.basePath, params);
  }

  async create(data: CreateCategoryData): Promise<Category> {
    return apiClient.post<Category>(this.basePath, data);
  }

  async getPaginated(
    page: number,
    limit: number
  ): Promise<PaginatedResponse<Category>> {
    // Implementação com paginação
  }
}
```

### 5. **Internacionalização Centralizada**

#### Estrutura de Traduções

```
i18n/
├── en/
│   ├── common.json      # Traduções comuns
│   └── admin.json       # Traduções administrativas
└── pt/
    ├── common.json      # Traduções comuns
    └── admin.json       # Traduções administrativas
```

#### Hook de Tradução

```typescript
export function useTranslations(namespace: string) {
  const { t, loadNamespace, isLoading } = useI18n();

  useEffect(() => {
    loadNamespace(namespace);
  }, [namespace, loadNamespace]);

  return {
    t: (key: string, params?: Record<string, string>) =>
      t(`${namespace}.${key}`, params),
    isLoading,
  };
}
```

### 6. **Estrutura de Testes**

#### Organização de Testes

```
__tests__/
├── components/          # Testes de componentes
│   └── Button.test.tsx
├── hooks/              # Testes de hooks
│   └── useTranslations.test.tsx
└── pages/              # Testes de páginas
    └── admin.test.tsx
```

#### Exemplo de Teste

```typescript
describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
```

## 🎨 Design System Detalhado

### Form System

```typescript
<Form
  initialValues={{ name: '', email: '' }}
  validate={(values) => {
    const errors: Record<string, string> = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) errors.email = 'Email is required';
    return errors;
  }}
  onSubmit={(values) => console.log(values)}
>
  <FormField name="name" label="Name" required>
    <Input name="name" />
  </FormField>
  <FormField name="email" label="Email" required>
    <Input name="email" type="email" />
  </FormField>
  <Button type="submit">Submit</Button>
</Form>
```

### Table System

```typescript
<Table>
  <TableHeader>
    <TableRow>
      <TableHead sortable sortDirection="asc" onSort={() => {}}>
        Name
      </TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <Dropdown
            trigger={<MenuButton>⋮</MenuButton>}
            items={[
              createDropdownItems.edit(() => editUser(user.id)),
              createDropdownItems.delete(() => deleteUser(user.id)),
            ]}
          />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Toast System

```typescript
const { showSuccess, showError } = useToastNotifications();

// Uso
showSuccess('User created successfully');
showError('Failed to create user');
```

## 🚀 Performance e Otimização

### Code Splitting

```typescript
// Lazy loading de componentes
const AdminPage = lazy(() => import('./admin/page'));
const ComponentsDemo = lazy(() => import('./components-demo/page'));

// Uso com Suspense
<Suspense fallback={<Spinner />}>
  <AdminPage />
</Suspense>
```

### React Query Integration

```typescript
function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

function CategoriesList() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading categories</div>;

  return (
    <div>
      {categories?.map(category => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
```

## 🔧 Configuração e Setup

### TailwindCSS Configuration

```typescript
// tailwind.config.ts
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... outras cores
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🧪 Estratégia de Testes

### Configuração de Testes

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Testes de Componentes

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testes de Hooks

```typescript
import { renderHook } from '@testing-library/react';
import { useTranslations } from '@/hooks/useTranslations';

describe('useTranslations', () => {
  it('returns translation function', () => {
    const { result } = renderHook(() => useTranslations('admin'));

    expect(typeof result.current.t).toBe('function');
    expect(result.current.isLoading).toBe(false);
  });
});
```

## 📱 Responsive Design

### Breakpoints

```typescript
const breakpoints = {
  sm: '640px', // Mobile landscape
  md: '768px', // Tablet
  lg: '1024px', // Desktop
  xl: '1280px', // Large desktop
  '2xl': '1536px', // Extra large
};
```

### Responsive Components

```typescript
export const ResponsiveGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {children}
    </div>
  );
};
```

## 🔍 SEO e Meta Tags

### Metadata API

```typescript
// app/[locale]/admin/page.tsx
export const metadata: Metadata = {
  title: 'Admin Dashboard | Local Classifieds',
  description: 'Manage categories and content',
  keywords: ['admin', 'dashboard', 'categories'],
  openGraph: {
    title: 'Admin Dashboard',
    description: 'Manage categories and content',
    type: 'website',
  },
};
```

### Structured Data

```typescript
// components/StructuredData.tsx
export const StructuredData: React.FC<{ data: any }> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
```

## 🛠️ Development Tools

### ESLint Configuration

```javascript
// eslint.config.mjs
export default [
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
```

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## 🚀 Deploy e CI/CD

### Build Optimization

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
};

export default nextConfig;
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Local Classifieds
```

## 🎯 Próximos Passos

### Melhorias Futuras

1. **Storybook**: Documentação interativa de componentes
2. **E2E Testing**: Testes end-to-end com Playwright
3. **Performance Monitoring**: Web Vitals e APM
4. **Accessibility**: Melhorias de a11y
5. **PWA**: Progressive Web App features
6. **Micro-frontends**: Arquitetura modular

### Otimizações

1. **Bundle Analysis**: Análise de bundle size
2. **Image Optimization**: Otimização de imagens
3. **Caching Strategy**: Estratégia de cache
4. **CDN Integration**: Integração com CDN

---

## 📚 Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Vitest Documentation](https://vitest.dev/)
