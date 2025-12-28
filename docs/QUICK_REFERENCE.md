# ⚡ Quick Reference - Local Classifieds

## 🚀 Comandos Essenciais

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

# Seed do banco
npm run db:seed
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

### Docker

```bash
# Subir containers
npm run docker:up

# Parar containers
npm run docker:down

# Ver logs
npm run docker:logs

# Reiniciar containers
npm run docker:restart
```

## 📁 Estrutura de Arquivos

### API (NestJS)

```
apps/api/src/
├── modules/categories/     # Módulo de categorias
│   ├── dto/              # Data Transfer Objects
│   ├── entities/         # Entidades de domínio
│   ├── __tests__/        # Testes unitários
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   └── categories.module.ts
├── common/               # Utilitários compartilhados
├── config/              # Configurações
└── main.ts              # Entry point
```

### Frontend (Next.js)

```
apps/frontend/src/
├── app/[locale]/        # App Router com i18n
│   ├── (admin)/        # Grupo de rotas administrativas
│   │   ├── dashboard/  # Dashboard principal
│   │   ├── users/      # Gerenciamento de usuários
│   │   └── categories/ # Gerenciamento de categorias
│   ├── (marketing)/    # Grupo de rotas de marketing
│   │   ├── home/       # Página inicial
│   │   ├── about/      # Sobre nós
│   │   └── components-demo/ # Demonstração de componentes
│   └── layout.tsx      # Layout com sidebar
├── app/providers/      # Context/Providers globais
│   ├── ThemeProvider.tsx
│   ├── I18nProvider.tsx
│   └── QueryProvider.tsx
├── components/ui/       # Design System completo
│   ├── Button.tsx      # Botão reutilizável
│   ├── Form.tsx        # Form system
│   ├── Table.tsx       # Table component
│   ├── Toast.tsx       # Toast notifications
│   └── Dropdown.tsx    # Dropdown menu
├── hooks/              # Custom Hooks
├── i18n/               # Arquivos de tradução
├── services/           # Camada de API
└── __tests__/          # Estrutura de testes
```

### Libraries

```
libs/
├── database/           # Infraestrutura de dados
│   ├── prisma/        # Schema e migrações
│   └── src/           # Serviços e repositories
└── shared/            # Código compartilhado
    └── src/
        ├── dto/       # DTOs cross-module
        ├── types/     # Tipos compartilhados
        └── utils/     # Utilitários
```

## 🎯 Endpoints da API

### Categories

```bash
# Listar categorias
GET /api/categories

# Buscar categoria por ID
GET /api/categories/:id

# Buscar categoria por slug
GET /api/categories/slug/:slug

# Criar categoria
POST /api/categories
{
  "slug": "category-slug",
  "displayOrder": 0,
  "translations": [
    {
      "language": "pt",
      "name": "Nome da Categoria",
      "description": "Descrição da categoria"
    }
  ]
}

# Atualizar categoria
PUT /api/categories/:id

# Deletar categoria (soft delete)
DELETE /api/categories/:id

# Restaurar categoria
POST /api/categories/:id/restore

# Obter hierarquia
GET /api/categories/hierarchy

# Obter estatísticas
GET /api/categories/stats
```

## 🎨 Componentes UI

### Button

```tsx
<Button variant='primary' size='md' loading={false}>
  Click me
</Button>
```

### Select

```tsx
<Select
  label='Categoria'
  options={[
    { value: '1', label: 'Categoria 1' },
    { value: '2', label: 'Categoria 2' },
  ]}
  placeholder='Selecione uma categoria'
  required
/>
```

### Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title='Adicionar Categoria'
  size='md'
>
  <AddCategoryForm />
</Modal>
```

### Card

```tsx
<Card>
  <CardHeader>
    <H2>Título</H2>
  </CardHeader>
  <CardContent>Conteúdo do card</CardContent>
</Card>
```

### Form

```tsx
<Form
  initialValues={{ name: '', email: '' }}
  onSubmit={values => console.log(values)}
>
  <FormField name='name' label='Name' required>
    <Input name='name' />
  </FormField>
  <FormField name='email' label='Email' required>
    <Input name='email' type='email' />
  </FormField>
  <Button type='submit'>Submit</Button>
</Form>
```

### Table

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead sortable>Name</TableHead>
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

### Toast

```tsx
const { showSuccess, showError } = useToastNotifications();

// Uso
showSuccess('User created successfully');
showError('Failed to create user');
```

## 🔧 Configurações

### Environment Variables

```bash
# API
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/local_classifieds
API_PREFIX=api
CORS_ORIGIN=*

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Local Classifieds
```

### TypeScript Paths

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

## 🧪 Testes

### API Tests

```bash
# Testes unitários
npm run test:api

# Testes e2e
npm run test:e2e

# Coverage
npm run test:cov
```

### Frontend Tests

```bash
# Testes unitários
npm run test:frontend

# Testes com watch
npm run test:watch
```

## 🐳 Docker

### Docker Compose

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: local_classifieds
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 📊 Scripts Úteis

### Limpeza

```bash
# Limpar node_modules
npm run clean

# Limpar builds
npm run clean:build

# Limpar cache
npm run clean:cache
```

### Qualidade

```bash
# Verificar tudo
npm run quality

# Corrigir problemas
npm run quality:fix

# CI/CD
npm run ci
```

## 🔍 Debugging

### API Debug

```bash
# Logs da API
npm run dev:api

# Debug com breakpoints
node --inspect-brk dist/main.js
```

### Frontend Debug

```bash
# Logs do Frontend
npm run dev:frontend

# Debug no browser
# Abrir DevTools > Sources > Breakpoints
```

### Database Debug

```bash
# Conectar ao banco
psql postgresql://user:password@localhost:5432/local_classifieds

# Ver logs do Prisma
DEBUG=prisma:* npm run dev:api
```

## 📚 URLs Úteis

### Desenvolvimento

- **API**: http://localhost:3000/api
- **Frontend**: http://localhost:3001
- **Prisma Studio**: http://localhost:5555
- **Database**: localhost:5432

### Documentação

- **API Docs**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/health

## 🚨 Troubleshooting

### Problemas Comuns

#### API não inicia

```bash
# Verificar se o banco está rodando
npm run docker:up

# Verificar variáveis de ambiente
cat .env

# Limpar e reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

#### Frontend não carrega

```bash
# Verificar se a API está rodando
curl http://localhost:3000/health

# Limpar cache do Next.js
rm -rf .next

# Verificar variáveis de ambiente
cat .env.local
```

#### Database connection failed

```bash
# Verificar se o Docker está rodando
docker ps

# Reiniciar containers
npm run docker:restart

# Verificar logs
npm run docker:logs
```

#### TypeScript errors

```bash
# Verificar tipos
npm run type-check

# Regenerar tipos do Prisma
npm run db:generate

# Limpar cache do TypeScript
rm -rf node_modules/.cache
```

## 📝 Git Workflow

### Commits

```bash
# Commit com verificação
git commit -m "feat: add new feature"

# Commit sem verificação (emergência)
git commit --no-verify -m "fix: critical bug"
```

### Branches

```bash
# Criar feature branch
git checkout -b feature/new-feature

# Criar fix branch
git checkout -b fix/bug-fix

# Merge para main
git checkout main
git merge feature/new-feature
```

## 🎯 Performance Tips

### API

- Use `take` e `skip` para paginação
- Implemente cache com Redis
- Otimize queries do Prisma
- Use connection pooling

### Frontend

- Implemente lazy loading
- Use Image optimization do Next.js
- Minimize bundle size
- Implemente code splitting

### Database

- Crie índices apropriados
- Use transactions para operações complexas
- Monitore query performance
- Implemente backup automático

---

## 📞 Suporte

- **Documentação**: `/docs/`
- **Issues**: GitHub Issues
- **Discord**: [Link do servidor]
- **Email**: support@localclassifieds.com
