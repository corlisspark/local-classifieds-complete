# Componentes UI

Este diretório contém componentes reutilizáveis para a interface do usuário.

## Tipografia

### H1, H2, H3

Componentes para títulos com hierarquia visual clara.

```tsx
import { H1, H2, H3 } from '@/components/ui';

<H1>Título Principal</H1>
<H2>Título Secundário</H2>
<H3>Título Terciário</H3>
```

### Body

Componente para texto normal/parágrafos.

```tsx
import { Body } from '@/components/ui';

<Body>Este é um parágrafo de texto normal.</Body>;
```

### Small

Componente para legendas e informações secundárias.

```tsx
import { Small } from '@/components/ui';

<Small>Texto pequeno para legendas</Small>;
```

## Botões

### Button

Componente de botão com múltiplas variantes e tamanhos.

#### Variantes

- `primary`: Botão principal (azul)
- `secondary`: Botão secundário (âmbar)
- `outline`: Botão com borda

#### Tamanhos

- `sm`: Pequeno
- `md`: Médio (padrão)
- `lg`: Grande

#### Exemplo de uso

```tsx
import { Button } from '@/components/ui';

// Botão primário médio
<Button>Clique aqui</Button>

// Botão secundário grande
<Button variant="secondary" size="lg">
  Botão Secundário
</Button>

// Botão outline pequeno
<Button variant="outline" size="sm">
  Botão Outline
</Button>

// Botão desabilitado
<Button disabled>Desabilitado</Button>
```

## Utilitários

### cn

Função utilitária para combinar classes CSS usando `clsx` e `tailwind-merge`.

```tsx
import { cn } from '@/utils/cn';

<div className={cn('base-class', condition && 'conditional-class', className)}>
  Conteúdo
</div>;
```

## Cores do Tema

O sistema de cores está configurado no `tailwind.config.js`:

- **Brand**: `brand-primary`, `brand-secondary`, `brand-accent`
- **Neutral**: `neutral-bg-light`, `neutral-bg-card`, `neutral-border`, `neutral-text-primary`, `neutral-text-secondary`
- **Status**: `status-success`, `status-warning`, `status-error`, `status-info`
- **Dark**: `dark-bg`, `dark-bg-card`, `dark-text-primary`, `dark-text-secondary`

## Demonstração

Acesse `/components-demo` para ver todos os componentes em ação.
