<<<<<<< HEAD
# 🏠 Local Classifieds

> Plataforma de classificados locais construída com arquitetura moderna e escalável

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📋 Visão Geral

O Local Classifieds é uma plataforma completa de classificados locais que permite aos usuários criar, gerenciar e navegar por anúncios em sua região. O projeto é construído com uma arquitetura moderna, escalável e profissional.

### ✨ Características Principais

- 🎯 **Arquitetura Modular**: Separação clara entre frontend e backend
- 🚀 **Performance**: Otimizado para velocidade e SEO
- 🌐 **Internacionalização**: Suporte a múltiplos idiomas
- 🎨 **Design System**: Componentes reutilizáveis e consistentes
- 🔒 **Segurança**: Validação robusta e autenticação segura
- 📱 **Responsivo**: Funciona perfeitamente em todos os dispositivos
- 🧪 **Testado**: Cobertura abrangente de testes
- 📊 **Monitoramento**: Logs estruturados e métricas de performance

## 🏗️ Arquitetura

### Stack Tecnológico

#### Backend (API)

- **Framework**: NestJS
- **Linguagem**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validação**: Zod
- **Testes**: Jest

#### Frontend

- **Framework**: Next.js (App Router)
- **Linguagem**: TypeScript + React
- **Styling**: TailwindCSS
- **Testes**: React Testing Library
- **i18n**: Internacionalização integrada
- **Data Fetching**: TanStack Query
- **Design System**: Componentes customizados

#### Infraestrutura

- **Containerização**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (frontend), Railway/Render (backend)

### Estrutura do Projeto

```
Local Classifieds/
├── 📱 apps/
│   ├── 🔧 api/                    # NestJS Backend
│   │   ├── src/
│   │   │   ├── modules/          # Módulos de funcionalidades
│   │   │   ├── common/           # Utilitários compartilhados
│   │   │   ├── config/           # Configurações
│   │   │   └── main.ts           # Entry point
│   │   └── libs/                 # Bibliotecas locais
│   └── 🎨 frontend/              # Next.js Frontend
│       ├── src/
│       │   ├── app/              # App Router
│       │   ├── components/       # Componentes React
│       │   ├── hooks/            # Custom Hooks
│       │   └── utils/            # Utilitários
│       └── public/               # Arquivos estáticos
├── 📚 libs/                      # Bibliotecas compartilhadas
│   ├── database/                 # Infraestrutura de dados
│   └── shared/                   # Código compartilhado
├── 📖 docs/                      # Documentação
├── 🐳 docker-compose.yml         # Configuração Docker
└── 📦 package.json               # Configuração do monorepo
```

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm 9+
- Docker e Docker Compose
- Git

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/your-username/local-classifieds.git
cd local-classifieds
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Inicie o banco de dados**

```bash
npm run dev:db
```

5. **Execute as migrações**

```bash
npm run db:migrate:dev
```

6. **Inicie o desenvolvimento**

```bash
npm run dev:all
```

### URLs de Desenvolvimento

- **Frontend**: http://localhost:3001
- **API**: http://localhost:3000/api
- **Prisma Studio**: http://localhost:5555
- **Documentação da API**: http://localhost:3000/api/docs

## 📚 Documentação

### Documentação Completa

- [🏗️ Arquitetura](./docs/ARCHITECTURE.md) - Visão geral da arquitetura
- [🔧 API Architecture](./docs/API_ARCHITECTURE.md) - Detalhes da API
- [🎨 Frontend Architecture](./docs/FRONTEND_ARCHITECTURE.md) - Detalhes do Frontend
- [🗄️ Database Schema](./docs/DATABASE_SCHEMA.md) - Esquema completo do banco de dados
- [📊 Database README](./docs/DATABASE_README.md) - Guia do banco de dados
- [⚡ Quick Reference](./docs/QUICK_REFERENCE.md) - Comandos e referências rápidas
- [🏃 Running Guide](./docs/RUNNING.md) - Como executar o projeto
- [💻 VS Code Setup](./docs/VSCODE_SETUP.md) - Configuração do editor

### API Endpoints

#### Categories

```bash
GET    /api/categories           # Listar categorias
GET    /api/categories/:id       # Buscar por ID
GET    /api/categories/slug/:slug # Buscar por slug
POST   /api/categories           # Criar categoria
PUT    /api/categories/:id       # Atualizar categoria
DELETE /api/categories/:id       # Deletar categoria
POST   /api/categories/:id/restore # Restaurar categoria
GET    /api/categories/hierarchy # Obter hierarquia
GET    /api/categories/stats     # Obter estatísticas
```

## 🛠️ Scripts de Desenvolvimento

### Desenvolvimento

```bash
npm run dev:all      # Iniciar tudo (DB + API + Frontend)
npm run dev:api      # Iniciar apenas API
npm run dev:frontend # Iniciar apenas Frontend
npm run dev:db       # Iniciar apenas Database
```

### Database

```bash
npm run db:generate     # Gerar cliente Prisma
npm run db:migrate:dev  # Executar migrações
npm run db:studio:dev   # Abrir Prisma Studio
npm run db:reset        # Reset do banco
npm run db:seed         # Seed do banco
```

### Qualidade de Código

```bash
npm run lint        # Lint
npm run format      # Formatação
npm run type-check  # Verificação de tipos
npm run test        # Testes
npm run build       # Build
```

### Docker

```bash
npm run docker:up      # Subir containers
npm run docker:down    # Parar containers
npm run docker:logs    # Ver logs
npm run docker:restart # Reiniciar containers
```

## 🧪 Testes

### Backend

```bash
npm run test:api    # Testes unitários da API
npm run test:e2e    # Testes end-to-end
npm run test:cov    # Coverage dos testes
```

### Frontend

```bash
npm run test:frontend # Testes do frontend
npm run test:watch    # Testes com watch mode
```

## 🎨 Design System

### Componentes Disponíveis

- **Button**: Botão reutilizável com variantes
- **Select**: Select com validação
- **Modal**: Modal responsivo
- **Card**: Card component
- **Input**: Input com validação
- **Badge**: Badge component
- **Typography**: Sistema de tipografia
- **Stack**: Componente de layout
- **Spinner**: Loading states
- **Form**: Sistema completo de formulários
- **Table**: Tabela com sorting e paginação
- **Toast**: Notificações toast
- **Dropdown**: Menu dropdown

### Uso dos Componentes

```tsx
import { Button, Select, Modal, Card } from '@/components/ui';

// Botão
<Button variant="primary" size="md" loading={false}>
  Click me
</Button>

// Select
<Select
  label="Categoria"
  options={options}
  placeholder="Selecione uma categoria"
  required
/>

// Modal
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Adicionar Categoria"
>
  <AddCategoryForm />
</Modal>
```

## 🌐 Internacionalização

O projeto suporta múltiplos idiomas através do sistema de internacionalização integrado:

### Idiomas Suportados

- 🇺🇸 English
- 🇧🇷 Português

### Adicionando Traduções

```typescript
// hooks/useTranslations.ts
const { t } = useTranslations('admin');

// Uso em componentes
<h1>{t('categories.title')}</h1>
```

## 🔒 Segurança

### API

- ✅ Validação de entrada com Zod
- ✅ Rate limiting
- ✅ CORS configurado
- ✅ Headers de segurança
- ✅ Sanitização de dados

### Database

- ✅ Conexões seguras
- ✅ Queries parametrizadas
- ✅ Backup automático
- ✅ Controle de acesso

## 📊 Monitoramento

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

## 🚀 Deploy

### Pipeline CI/CD

1. **Lint & Format**: Verificação de código
2. **Type Check**: Verificação de tipos
3. **Tests**: Execução de testes
4. **Build**: Compilação
5. **Deploy**: Deploy automático

### Ambientes

- **Development**: Local com Docker
- **Staging**: Preview deployments
- **Production**: Deploy automático

## 🤝 Contribuição

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- **Commits**: Seguir [Conventional Commits](https://www.conventionalcommits.org/)
- **Código**: Seguir as regras do ESLint e Prettier
- **Testes**: Manter cobertura de testes
- **Documentação**: Atualizar documentação quando necessário

### Estrutura de Branches

- `main`: Branch principal (produção)
- `develop`: Branch de desenvolvimento
- `feature/*`: Features novas
- `fix/*`: Correções de bugs
- `hotfix/*`: Correções urgentes

## 📈 Roadmap

### Próximas Features

- [ ] Sistema de autenticação (JWT)
- [ ] Upload de imagens
- [ ] Sistema de busca avançada
- [ ] Notificações em tempo real
- [ ] Sistema de avaliações
- [ ] Dashboard de analytics
- [ ] API mobile
- [ ] Sistema de pagamentos

### Melhorias Técnicas

- [ ] Cache com Redis
- [ ] Elasticsearch para busca
- [ ] CDN para assets
- [ ] Monitoring com APM
- [ ] Logs centralizados
- [ ] Backup automatizado

## 📞 Suporte

- **Documentação**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/your-username/local-classifieds/issues)
- **Discord**: [Link do servidor]
- **Email**: support@localclassifieds.com

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [NestJS](https://nestjs.com/) - Framework Node.js
- [Next.js](https://nextjs.org/) - Framework React
- [Prisma](https://www.prisma.io/) - ORM moderno
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS
- [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript

---

<div align="center">
  <p>Feito com ❤️ pela equipe Local Classifieds</p>
  <p>
    <a href="#-local-classifieds">⬆️ Voltar ao topo</a>
  </p>
</div>
=======
# local-classifieds-complete
>>>>>>> e5ecd05e44f710252d0695fc16df7f3966df8c8d
