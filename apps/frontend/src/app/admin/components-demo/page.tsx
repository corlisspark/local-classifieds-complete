// apps/frontend/src/app/admin/components-demo/page.tsx
'use client';

import React from 'react';

import {
  Autocomplete,
  Button,
  H1,
  H2,
  H3,
  Body,
  Small,
  Stack,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Badge,
  Input,
  Textarea,
  Select,
  Spinner,
  Modal,
  Form,
  FormField,
  FormLabel,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Dropdown,
  MenuButton,
  createDropdownItems,
  ToastProvider,
  useToastNotifications,
} from '../../../components/ui';

export default function ComponentsDemo() {
  return (
    <ToastProvider>
      <div className='container mx-auto px-4 py-8'>
        <H1 className='mb-8'>Componentes UI - Demonstração</H1>

        {/* Tipografia */}
        <section className='mb-12'>
          <H2 className='mb-6'>Tipografia</H2>
          <div className='space-y-4'>
            <H1>H1 - Título Principal</H1>
            <H2>H2 - Título Secundário</H2>
            <H3>H3 - Título Terciário</H3>
            <Body>
              Body - Este é um parágrafo de texto normal. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Body>
            <Small>
              Small - Este é um texto pequeno para legendas e informações
              secundárias.
            </Small>
          </div>
        </section>

        {/* Botões */}
        <section className='mb-12'>
          <H2 className='mb-6'>Botões</H2>
          <div className='space-y-6'>
            {/* Tamanhos */}
            <div>
              <H3 className='mb-4'>Tamanhos</H3>
              <div className='flex gap-4 items-center'>
                <Button size='sm'>Pequeno</Button>
                <Button size='md'>Médio</Button>
                <Button size='lg'>Grande</Button>
              </div>
            </div>

            {/* Variantes */}
            <div>
              <H3 className='mb-4'>Variantes</H3>
              <div className='flex gap-4 items-center'>
                <Button variant='primary'>Primário</Button>
                <Button variant='secondary'>Secundário</Button>
                <Button variant='outline'>Outline</Button>
              </div>
            </div>

            {/* Estados */}
            <div>
              <H3 className='mb-4'>Estados</H3>
              <div className='flex gap-4 items-center'>
                <Button>Normal</Button>
                <Button disabled>Desabilitado</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stack Component */}
        <section className='mb-12'>
          <H2 className='mb-6'>Stack Component</H2>
          <div className='space-y-8'>
            {/* Stack Vertical */}
            <div>
              <H3 className='mb-4'>Stack Vertical (padrão)</H3>
              <Stack spacing={2}>
                <div className='bg-brand-primary text-white p-4 rounded-lg text-center'>
                  Item 1
                </div>
                <div className='bg-brand-secondary text-white p-4 rounded-lg text-center'>
                  Item 2
                </div>
                <div className='bg-brand-accent text-white p-4 rounded-lg text-center'>
                  Item 3
                </div>
              </Stack>
            </div>

            {/* Stack Horizontal */}
            <div>
              <H3 className='mb-4'>Stack Horizontal</H3>
              <Stack direction='row' spacing={2}>
                <div className='bg-brand-primary text-white p-4 rounded-lg text-center flex-1'>
                  Item 1
                </div>
                <div className='bg-brand-secondary text-white p-4 rounded-lg text-center flex-1'>
                  Item 2
                </div>
                <div className='bg-brand-accent text-white p-4 rounded-lg text-center flex-1'>
                  Item 3
                </div>
              </Stack>
            </div>

            {/* Stack com Divider */}
            <div>
              <H3 className='mb-4'>Stack com Divider</H3>
              <Stack
                direction='row'
                divider={<Divider orientation='vertical' flexItem />}
                spacing={2}
              >
                <div className='bg-neutral-bg-card border border-neutral-border p-4 rounded-lg text-center flex-1'>
                  Item 1
                </div>
                <div className='bg-neutral-bg-card border border-neutral-border p-4 rounded-lg text-center flex-1'>
                  Item 2
                </div>
                <div className='bg-neutral-bg-card border border-neutral-border p-4 rounded-lg text-center flex-1'>
                  Item 3
                </div>
              </Stack>
            </div>

            {/* Stack Responsivo */}
            <div>
              <H3 className='mb-4'>Stack Responsivo</H3>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                className='flex-wrap'
              >
                <div className='bg-status-success text-white p-4 rounded-lg text-center flex-1 min-w-0'>
                  Item 1
                </div>
                <div className='bg-status-warning text-white p-4 rounded-lg text-center flex-1 min-w-0'>
                  Item 2
                </div>
                <div className='bg-status-info text-white p-4 rounded-lg text-center flex-1 min-w-0'>
                  Item 3
                </div>
              </Stack>
            </div>

            {/* Stack com Alinhamento */}
            <div>
              <H3 className='mb-4'>Stack com Alinhamento</H3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Small className='block mb-2'>alignItems: center</Small>
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}
                    className='h-20 bg-neutral-bg-card border border-neutral-border rounded-lg p-2'
                  >
                    <div className='bg-brand-primary text-white p-2 rounded text-sm'>
                      Item 1
                    </div>
                    <div className='bg-brand-secondary text-white p-2 rounded text-sm'>
                      Item 2
                    </div>
                    <div className='bg-brand-accent text-white p-2 rounded text-sm'>
                      Item 3
                    </div>
                  </Stack>
                </div>
                <div>
                  <Small className='block mb-2'>
                    justifyContent: space-between
                  </Small>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={2}
                    className='h-20 bg-neutral-bg-card border border-neutral-border rounded-lg p-2'
                  >
                    <div className='bg-brand-primary text-white p-2 rounded text-sm'>
                      Item 1
                    </div>
                    <div className='bg-brand-secondary text-white p-2 rounded text-sm'>
                      Item 2
                    </div>
                    <div className='bg-brand-accent text-white p-2 rounded text-sm'>
                      Item 3
                    </div>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className='mb-12'>
          <H2 className='mb-6'>Cards</H2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <Card>
              <CardHeader>
                <H3>Card Padrão</H3>
              </CardHeader>
              <CardContent>
                <Body>Este é um card com header e conteúdo.</Body>
              </CardContent>
            </Card>
            <Card variant='outlined'>
              <CardHeader>
                <H3>Card Outline</H3>
              </CardHeader>
              <CardContent>
                <Body>Card com borda destacada.</Body>
              </CardContent>
            </Card>
            <Card variant='elevated'>
              <CardHeader>
                <H3>Card Elevated</H3>
              </CardHeader>
              <CardContent>
                <Body>Card com sombra elevada.</Body>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section className='mb-12'>
          <H2 className='mb-6'>Badges</H2>
          <div className='space-y-4'>
            <div>
              <H3 className='mb-4'>Variantes</H3>
              <div className='flex gap-4 items-center'>
                <Badge variant='default'>Default</Badge>
                <Badge variant='success'>Success</Badge>
                <Badge variant='warning'>Warning</Badge>
                <Badge variant='error'>Error</Badge>
                <Badge variant='info'>Info</Badge>
              </div>
            </div>
            <div>
              <H3 className='mb-4'>Tamanhos</H3>
              <div className='flex gap-4 items-center'>
                <Badge size='sm'>Pequeno</Badge>
                <Badge size='md'>Médio</Badge>
                <Badge size='lg'>Grande</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className='mb-12'>
          <H2 className='mb-6'>Inputs</H2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <Input
                label='Input Normal'
                placeholder='Digite algo...'
                helperText='Texto de ajuda'
              />
              <Input
                label='Input com Erro'
                placeholder='Digite algo...'
                error='Este campo é obrigatório'
              />
              <Input
                label='Input Desabilitado'
                placeholder='Desabilitado'
                disabled
              />
            </div>
            <div className='space-y-4'>
              <Textarea
                label='Textarea'
                placeholder='Digite uma mensagem...'
                rows={4}
                helperText='Máximo 500 caracteres'
              />
              <Select
                label='Select'
                placeholder='Escolha uma opção'
                options={[
                  { value: '1', label: 'Opção 1' },
                  { value: '2', label: 'Opção 2' },
                  { value: '3', label: 'Opção 3' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Autocomplete */}
        <section className='mb-12'>
          <H2 className='mb-6'>Autocomplete</H2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div>
                <H3 className='mb-4'>Autocomplete Básico</H3>
                <Autocomplete
                  options={[
                    {
                      value: '1',
                      label: 'React',
                      description: 'Biblioteca JavaScript para UI',
                    },
                    {
                      value: '2',
                      label: 'Vue.js',
                      description: 'Framework JavaScript progressivo',
                    },
                    {
                      value: '3',
                      label: 'Angular',
                      description: 'Framework TypeScript da Google',
                    },
                    {
                      value: '4',
                      label: 'Svelte',
                      description: 'Framework JavaScript compilado',
                    },
                    {
                      value: '5',
                      label: 'Next.js',
                      description: 'Framework React para produção',
                    },
                  ]}
                  value=''
                  onChange={() => {}}
                  placeholder='Buscar framework...'
                  emptyMessage='Nenhum framework encontrado'
                />
              </div>
              <div>
                <H3 className='mb-4'>Autocomplete com Categorias</H3>
                <Autocomplete
                  options={[
                    {
                      value: '',
                      label: 'Nenhuma categoria',
                      description: 'Categoria raiz',
                    },
                    {
                      value: '1',
                      label: 'Tecnologia',
                      description: 'Produtos e serviços de tecnologia',
                    },
                    {
                      value: '2',
                      label: 'Casa e Jardim',
                      description: 'Itens para casa e jardim',
                    },
                    {
                      value: '3',
                      label: 'Esportes',
                      description: 'Equipamentos e acessórios esportivos',
                    },
                    {
                      value: '4',
                      label: 'Moda',
                      description: 'Roupas e acessórios de moda',
                    },
                    {
                      value: '5',
                      label: 'Livros',
                      description: 'Livros e materiais educativos',
                    },
                  ]}
                  value=''
                  onChange={() => {}}
                  placeholder='Selecionar categoria pai...'
                  emptyMessage='Nenhuma categoria encontrada'
                />
              </div>
            </div>
            <div className='space-y-4'>
              <div>
                <H3 className='mb-4'>Autocomplete Desabilitado</H3>
                <Autocomplete
                  options={[
                    { value: '1', label: 'Opção 1' },
                    { value: '2', label: 'Opção 2' },
                  ]}
                  value=''
                  onChange={() => {}}
                  placeholder='Campo desabilitado'
                  disabled
                />
              </div>
              <div>
                <H3 className='mb-4'>Autocomplete com Loading</H3>
                <Autocomplete
                  options={[]}
                  value=''
                  onChange={() => {}}
                  placeholder='Carregando opções...'
                  loading
                  emptyMessage='Carregando...'
                />
              </div>
              <div>
                <H3 className='mb-4'>Autocomplete Não Pesquisável</H3>
                <Autocomplete
                  options={[
                    {
                      value: '1',
                      label: 'Opção 1',
                      description: 'Primeira opção',
                    },
                    {
                      value: '2',
                      label: 'Opção 2',
                      description: 'Segunda opção',
                    },
                    {
                      value: '3',
                      label: 'Opção 3',
                      description: 'Terceira opção',
                    },
                  ]}
                  value=''
                  onChange={() => {}}
                  placeholder='Selecionar opção...'
                  searchable={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Spinner */}
        <section className='mb-12'>
          <H2 className='mb-6'>Spinner</H2>
          <div className='space-y-4'>
            <div>
              <H3 className='mb-4'>Tamanhos</H3>
              <div className='flex gap-4 items-center'>
                <Spinner size='sm' />
                <Spinner size='md' />
                <Spinner size='lg' />
              </div>
            </div>
            <div>
              <H3 className='mb-4'>Cores</H3>
              <div className='flex gap-4 items-center'>
                <Spinner color='primary' />
                <Spinner color='neutral' />
                <div className='bg-gray-800 p-2 rounded'>
                  <Spinner color='secondary' />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className='mb-12'>
          <H2 className='mb-6'>Form</H2>
          <Card className='max-w-md'>
            <CardContent className='p-6'>
              <Form
                initialValues={{ name: '', email: '', message: '' }}
                onSubmit={() => {}}
              >
                <FormField name='name' label='Nome' required>
                  <Input name='name' placeholder='Seu nome' />
                </FormField>
                <FormField name='email' label='Email' required>
                  <Input
                    name='email'
                    type='email'
                    placeholder='seu@email.com'
                  />
                </FormField>
                <FormField name='message' label='Mensagem'>
                  <Textarea
                    name='message'
                    placeholder='Sua mensagem...'
                    rows={3}
                  />
                </FormField>
                <Button type='submit' className='w-full'>
                  Enviar
                </Button>
              </Form>
            </CardContent>
          </Card>
        </section>

        {/* Table */}
        <section className='mb-12'>
          <H2 className='mb-6'>Table</H2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead sortable>Nome</TableHead>
                  <TableHead sortable>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>João Silva</TableCell>
                  <TableCell>joao@email.com</TableCell>
                  <TableCell>
                    <Badge variant='success'>Ativo</Badge>
                  </TableCell>
                  <TableCell>
                    <Dropdown
                      trigger={<MenuButton>⋮</MenuButton>}
                      items={[
                        createDropdownItems.edit(
                          () => /* console.log */ 'Edit'
                        ),
                        createDropdownItems.delete(
                          () => /* console.log */ 'Delete'
                        ),
                      ]}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Maria Santos</TableCell>
                  <TableCell>maria@email.com</TableCell>
                  <TableCell>
                    <Badge variant='warning'>Pendente</Badge>
                  </TableCell>
                  <TableCell>
                    <Dropdown
                      trigger={<MenuButton>⋮</MenuButton>}
                      items={[
                        createDropdownItems.edit(
                          () => /* console.log */ 'Edit'
                        ),
                        createDropdownItems.delete(
                          () => /* console.log */ 'Delete'
                        ),
                      ]}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* Dropdown */}
        <section className='mb-12'>
          <H2 className='mb-6'>Dropdown</H2>
          <div className='flex gap-4 items-center'>
            <Dropdown
              trigger={<MenuButton>⚙️</MenuButton>}
              items={[
                {
                  id: 'profile',
                  label: 'Perfil',
                  onClick: () => /* console.log */ 'Profile',
                },
                {
                  id: 'settings',
                  label: 'Configurações',
                  onClick: () => /* console.log */ 'Settings',
                },
                { id: 'divider', label: '', divider: true },
                {
                  id: 'logout',
                  label: 'Sair',
                  onClick: () => /* console.log */ 'Logout',
                  variant: 'danger',
                },
              ]}
            />
            <Dropdown
              trigger={<MenuButton>⋮</MenuButton>}
              items={[
                createDropdownItems.edit(() => /* console.log */ 'Edit'),
                createDropdownItems.view(() => /* console.log */ 'View'),
                createDropdownItems.delete(() => /* console.log */ 'Delete'),
              ]}
            />
          </div>
        </section>

        {/* Modal */}
        <section className='mb-12'>
          <H2 className='mb-6'>Modal</H2>
          <ModalExample />
        </section>

        {/* FormLabel */}
        <section className='mb-12'>
          <H2 className='mb-6'>FormLabel</H2>
          <Card className='max-w-md'>
            <CardContent className='p-6'>
              <div className='space-y-4'>
                <div>
                  <FormLabel>Label Normal</FormLabel>
                  <Input placeholder='Campo com label normal' />
                </div>
                <div>
                  <FormLabel required>Label Obrigatório</FormLabel>
                  <Input placeholder='Campo obrigatório' />
                </div>
                <div>
                  <FormLabel htmlFor='custom-input'>Label com ID</FormLabel>
                  <Input
                    id='custom-input'
                    placeholder='Campo com ID customizado'
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Autocomplete Interativo */}
        <section className='mb-12'>
          <H2 className='mb-6'>Autocomplete Interativo</H2>
          <AutocompleteExample />
        </section>

        {/* Toast/Snackbar */}
        <section className='mb-12'>
          <H2 className='mb-6'>Toast/Snackbar</H2>
          <ToastExample />
        </section>
      </div>
    </ToastProvider>
  );
}

// Modal Example Component
function ModalExample() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [size, setSize] = React.useState<'sm' | 'md' | 'lg'>('md');

  return (
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <Button
          onClick={() => {
            setSize('sm');
            setIsOpen(true);
          }}
        >
          Modal Pequeno
        </Button>
        <Button
          onClick={() => {
            setSize('md');
            setIsOpen(true);
          }}
        >
          Modal Médio
        </Button>
        <Button
          onClick={() => {
            setSize('lg');
            setIsOpen(true);
          }}
        >
          Modal Grande
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Modal ${size === 'sm' ? 'Pequeno' : size === 'md' ? 'Médio' : 'Grande'}`}
        size={size}
      >
        <div className='space-y-4'>
          <Body>
            Este é um exemplo de modal{' '}
            {size === 'sm' ? 'pequeno' : size === 'md' ? 'médio' : 'grande'}.
            Você pode usar modais para confirmar ações, exibir formulários ou
            mostrar informações importantes.
          </Body>
          <div className='flex gap-2 justify-end'>
            <Button variant='outline' onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirmar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Autocomplete Example Component
function AutocompleteExample() {
  const [selectedFramework, setSelectedFramework] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const { showSuccess } = useToastNotifications();

  const frameworkOptions = [
    {
      value: '1',
      label: 'React',
      description: 'Biblioteca JavaScript para UI',
    },
    {
      value: '2',
      label: 'Vue.js',
      description: 'Framework JavaScript progressivo',
    },
    {
      value: '3',
      label: 'Angular',
      description: 'Framework TypeScript da Google',
    },
    {
      value: '4',
      label: 'Svelte',
      description: 'Framework JavaScript compilado',
    },
    {
      value: '5',
      label: 'Next.js',
      description: 'Framework React para produção',
    },
    {
      value: '6',
      label: 'Nuxt.js',
      description: 'Framework Vue.js para produção',
    },
    {
      value: '7',
      label: 'SvelteKit',
      description: 'Framework Svelte para produção',
    },
  ];

  const categoryOptions = [
    { value: '', label: 'Nenhuma categoria', description: 'Categoria raiz' },
    {
      value: '1',
      label: 'Tecnologia',
      description: 'Produtos e serviços de tecnologia',
    },
    {
      value: '2',
      label: 'Casa e Jardim',
      description: 'Itens para casa e jardim',
    },
    {
      value: '3',
      label: 'Esportes',
      description: 'Equipamentos e acessórios esportivos',
    },
    { value: '4', label: 'Moda', description: 'Roupas e acessórios de moda' },
    {
      value: '5',
      label: 'Livros',
      description: 'Livros e materiais educativos',
    },
    {
      value: '6',
      label: 'Eletrônicos',
      description: 'Dispositivos e acessórios eletrônicos',
    },
    {
      value: '7',
      label: 'Automóveis',
      description: 'Veículos e peças automotivas',
    },
  ];

  const handleSubmit = () => {
    const framework = frameworkOptions.find(f => f.value === selectedFramework);
    const category = categoryOptions.find(c => c.value === selectedCategory);

    if (framework && category) {
      showSuccess(
        `Selecionado: ${framework.label} na categoria ${category.label}`
      );
    } else {
      showSuccess('Formulário enviado!');
    }
  };

  return (
    <div className='space-y-6'>
      <Card className='max-w-2xl'>
        <CardHeader>
          <H3>Exemplo de Formulário com Autocomplete</H3>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-neutral-text-primary mb-2'>
              Framework Preferido
            </label>
            <Autocomplete
              options={frameworkOptions}
              value={selectedFramework}
              onChange={setSelectedFramework}
              placeholder='Buscar framework...'
              emptyMessage='Nenhum framework encontrado'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-neutral-text-primary mb-2'>
              Categoria
            </label>
            <Autocomplete
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder='Selecionar categoria...'
              emptyMessage='Nenhuma categoria encontrada'
            />
          </div>

          <div className='flex gap-2 pt-4'>
            <Button onClick={handleSubmit}>Enviar Seleção</Button>
            <Button
              variant='outline'
              onClick={() => {
                setSelectedFramework('');
                setSelectedCategory('');
              }}
            >
              Limpar
            </Button>
          </div>

          {(selectedFramework || selectedCategory) && (
            <div className='mt-4 p-3 bg-neutral-bg-card border border-neutral-border rounded-lg'>
              <Small className='text-neutral-text-secondary mb-2 block'>
                Seleções atuais:
              </Small>
              {selectedFramework && (
                <div className='text-sm'>
                  <strong>Framework:</strong>{' '}
                  {
                    frameworkOptions.find(f => f.value === selectedFramework)
                      ?.label
                  }
                </div>
              )}
              {selectedCategory && (
                <div className='text-sm'>
                  <strong>Categoria:</strong>{' '}
                  {
                    categoryOptions.find(c => c.value === selectedCategory)
                      ?.label
                  }
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4'>
          <H3 className='mb-3'>Recursos do Autocomplete</H3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
            <div>
              <Body className='font-medium mb-2'>Funcionalidades:</Body>
              <ul className='space-y-1 text-neutral-text-secondary'>
                <li>• Busca em tempo real</li>
                <li>• Navegação por teclado</li>
                <li>• Suporte a descrições</li>
                <li>• Estados de loading</li>
                <li>• Campo desabilitado</li>
              </ul>
            </div>
            <div>
              <Body className='font-medium mb-2'>Atalhos de Teclado:</Body>
              <ul className='space-y-1 text-neutral-text-secondary'>
                <li>• ↑↓ Navegar opções</li>
                <li>• Enter Selecionar</li>
                <li>• Escape Fechar</li>
                <li>• Tab Focar próximo campo</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Toast Example Component
function ToastExample() {
  const { showSuccess, showError, showWarning, showInfo } =
    useToastNotifications();

  return (
    <div className='space-y-4'>
      <div>
        <H3 className='mb-4'>Tipos de Toast</H3>
        <div className='flex gap-4 flex-wrap'>
          <Button
            onClick={() => showSuccess('Operação realizada com sucesso!')}
          >
            Success Toast
          </Button>
          <Button
            variant='outline'
            onClick={() => showError('Erro ao processar solicitação')}
          >
            Error Toast
          </Button>
          <Button
            variant='secondary'
            onClick={() => showWarning('Atenção: Verifique os dados')}
          >
            Warning Toast
          </Button>
          <Button
            variant='outline'
            onClick={() => showInfo('Informação importante')}
          >
            Info Toast
          </Button>
        </div>
      </div>

      <div>
        <H3 className='mb-4'>Exemplo de Uso</H3>
        <Card>
          <CardContent className='p-4'>
            <Body className='mb-4'>
              Clique nos botões acima para ver diferentes tipos de notificações
              toast. As notificações aparecerão no canto da tela e desaparecerão
              automaticamente.
            </Body>
            <div className='flex gap-2'>
              <Button
                size='sm'
                onClick={() => showSuccess('Dados salvos com sucesso!')}
              >
                Salvar
              </Button>
              <Button
                size='sm'
                variant='outline'
                onClick={() => showError('Falha ao salvar dados')}
              >
                Simular Erro
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Color System Section */}
      <div className='mb-8'>
        <H2 className='mb-6'>Sistema de Cores</H2>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
          {/* Brand Colors */}
          <div className='bg-brand-primary text-white p-4 rounded-lg text-center'>
            <p className='font-semibold'>Brand Primary</p>
            <p className='text-sm opacity-90'>#2563EB</p>
          </div>

          <div className='bg-brand-primary-dark text-white p-4 rounded-lg text-center'>
            <p className='font-semibold'>Brand Primary Dark</p>
            <p className='text-sm opacity-90'>#1E40AF</p>
          </div>

          <div className='bg-brand-secondary text-white p-4 rounded-lg text-center'>
            <p className='font-semibold'>Brand Secondary</p>
            <p className='text-sm opacity-90'>#F59E0B</p>
          </div>

          <div className='bg-brand-accent text-white p-4 rounded-lg text-center'>
            <p className='font-semibold'>Brand Accent</p>
            <p className='text-sm opacity-90'>#0D9488</p>
          </div>

          {/* Status Colors */}
          <div className='bg-status-success text-white p-4 rounded-lg text-center'>
            <p className='font-semibold'>Status Success</p>
            <p className='text-sm opacity-90'>#10B981</p>
          </div>

          <div className='bg-status-warning text-white p-4 rounded-lg text-center'>
            <p className='font-semibold'>Status Warning</p>
            <p className='text-sm opacity-90'>#FBBF24</p>
          </div>

          <div className='bg-status-error text-white p-4 rounded-lg text-center'>
            <p className='font-semibold'>Status Error</p>
            <p className='text-sm opacity-90'>#EF4444</p>
          </div>

          <div className='bg-status-info text-white p-4 rounded-lg text-center'>
            <p className='font-semibold'>Status Info</p>
            <p className='text-sm opacity-90'>#3B82F6</p>
          </div>
        </div>

        {/* Neutral Colors */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-8'>
          <div className='bg-neutral-bg-card border border-neutral-border p-4 rounded-lg text-center'>
            <p className='font-semibold text-neutral-text-primary'>
              Neutral Card
            </p>
            <p className='text-sm text-neutral-text-secondary'>#FFFFFF</p>
          </div>

          <div className='bg-neutral-text-primary text-white p-4 rounded-lg text-center'>
            <p className='font-semibold'>Neutral Text Primary</p>
            <p className='text-sm opacity-90'>#111827</p>
          </div>

          <div className='bg-neutral-text-secondary text-white p-4 rounded-lg text-center'>
            <p className='font-semibold'>Neutral Text Secondary</p>
            <p className='text-sm opacity-90'>#6B7280</p>
          </div>
        </div>

        {/* Dark Colors */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <div className='bg-dark-bg text-dark-text-primary p-4 rounded-lg text-center'>
            <p className='font-semibold'>Dark BG</p>
            <p className='text-sm text-dark-text-secondary'>#111827</p>
          </div>

          <div className='bg-dark-bg-card text-dark-text-primary p-4 rounded-lg text-center'>
            <p className='font-semibold'>Dark BG Card</p>
            <p className='text-sm text-dark-text-secondary'>#1F2937</p>
          </div>

          <div className='bg-neutral-border text-neutral-text-primary p-4 rounded-lg text-center'>
            <p className='font-semibold'>Neutral Border</p>
            <p className='text-sm text-neutral-text-secondary'>#E5E7EB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
