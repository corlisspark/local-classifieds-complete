# Stack Component

O componente Stack é um container para organizar elementos verticalmente ou horizontalmente, similar ao [Material UI Stack](https://mui.com/material-ui/react-stack/).

## Características

- ✅ Layout unidimensional (vertical ou horizontal)
- ✅ Controle de espaçamento entre elementos
- ✅ Suporte a dividers
- ✅ Alinhamento flexível (alignItems, justifyContent)
- ✅ Suporte a flexbox gap
- ✅ Totalmente responsivo
- ✅ TypeScript support

## Uso Básico

```tsx
import { Stack } from '@/components/ui';

// Stack vertical (padrão)
<Stack spacing={2}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Stack horizontal
<Stack direction="row" spacing={2}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

## Props

| Prop             | Tipo                                                                                            | Padrão         | Descrição                      |
| ---------------- | ----------------------------------------------------------------------------------------------- | -------------- | ------------------------------ |
| `children`       | `React.ReactNode`                                                                               | -              | Elementos filhos               |
| `direction`      | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'`                                        | `'column'`     | Direção do layout              |
| `spacing`        | `number \| string`                                                                              | `0`            | Espaçamento entre elementos    |
| `alignItems`     | `'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline'`                             | `'stretch'`    | Alinhamento dos itens          |
| `justifyContent` | `'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'flex-start'` | Justificação do conteúdo       |
| `divider`        | `React.ReactElement`                                                                            | -              | Elemento para dividir os itens |
| `useFlexGap`     | `boolean`                                                                                       | `false`        | Usar CSS flexbox gap           |
| `className`      | `string`                                                                                        | -              | Classes CSS adicionais         |
| `sx`             | `React.CSSProperties`                                                                           | -              | Estilos inline                 |

## Exemplos

### Stack com Divider

```tsx
import { Stack, Divider } from '@/components/ui';

<Stack
  direction='row'
  divider={<Divider orientation='vertical' flexItem />}
  spacing={2}
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>;
```

### Stack Responsivo

```tsx
<Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }}
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

### Stack com Alinhamento

```tsx
<Stack
  direction='row'
  alignItems='center'
  justifyContent='space-between'
  spacing={2}
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

### Usando Flexbox Gap

```tsx
<Stack direction='row' spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

## Diferenças do Material UI

- Implementação baseada em Tailwind CSS
- Suporte nativo a valores responsivos para `direction` e `spacing`
- Integração com o sistema de design do projeto
- Performance otimizada com React.forwardRef

## Limitações

- Margin customizada nos children não é suportada por padrão (use `useFlexGap` para contornar)
- `white-space: nowrap` pode causar problemas de posicionamento (use `minWidth: 0` no container)
