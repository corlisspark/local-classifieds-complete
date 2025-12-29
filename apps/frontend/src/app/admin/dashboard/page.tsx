// apps/frontend/src/app/admin/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Autocomplete,
  Button,
  H1,
  H2,
  H3,
  Body,
  Small,
  Stack,
  Card,
  CardHeader,
  CardContent,
  Badge,
  Input,
  Modal,
  Sidebar,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  Dropdown,
  MenuButton,
  createDropdownItems,
} from '../../../components/ui';
import {
  useCategoriesPaginated,
  useCategories,
  useCategoryStats,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useRestoreCategory,
  type Category,
} from '../../../services';
import {
  useServicesPaginated,
  useServiceStats,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from '../../../hooks/useServices';
import {
  type Service,
  type CreateServiceData,
} from '../../../services/services';
import { Spinner } from '../../../components/ui/Spinner';
import { useToastNotifications } from '../../../components/ui/Toast';
import type { AutocompleteOption } from '../../../components/ui/Autocomplete';
import { getCategoryName } from '../../../hooks/useTranslations';
import {
  CategorySortField,
  SortOrder,
  AdminSection,
} from '../../../types/enums';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>(
    AdminSection.CATEGORIES
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  // States for listings
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [serviceSearchTerm, setServiceSearchTerm] = useState('');
  const [showInactiveServices, setShowInactiveServices] = useState(false);

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  // Estados para ordenação
  const [sortBy, setSortBy] = useState<CategorySortField>(
    CategorySortField.DISPLAY_ORDER
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);

  // Estados para formulário de edição
  const [editFormData, setEditFormData] = useState({
    slug: '',
    parentId: '',
    displayOrder: 0,
    active: true,
    translations: [
      { language: 'pt', name: '', description: '' },
      { language: 'en', name: '', description: '' },
    ],
  });

  // Hooks para buscar dados reais da API
  const {
    data: paginatedData,
    isLoading,
    error,
    refetch,
  } = useCategoriesPaginated(page, limit, {
    includeInactive: showInactive,
    includeChildren: false,
  });

  const { data: stats } = useCategoryStats();

  // Services data fetching
  const {
    data: servicesPaginatedData,
    isLoading: servicesLoading,
    error: servicesError,
    refetch: refetchServices,
  } = useServicesPaginated(page, limit, {
    includeProvider: true,
    includeCategory: true,
  });

  const { data: servicesStats } = useServiceStats();

  // Hook para buscar todas as categorias (sem paginação) para o Autocomplete
  const { data: allCategories = [] } = useCategories({
    includeInactive: false, // Só categorias ativas para o Autocomplete
    includeChildren: false,
  });

  // Hook para criar categoria
  const createCategoryMutation = useCreateCategory();

  // Hook para atualizar categoria
  const updateCategoryMutation = useUpdateCategory();

  // Hook para deletar categoria
  const deleteCategoryMutation = useDeleteCategory();

  // Hook para restaurar categoria
  const restoreCategoryMutation = useRestoreCategory();

  // Services mutations
  const createServiceMutation = useCreateService();
  const updateServiceMutation = useUpdateService();
  const deleteServiceMutation = useDeleteService();

  // Hook para notificações
  const { showSuccess, showError } = useToastNotifications();

  const allCategoriesFromAPI = paginatedData?.data || [];
  const pagination = paginatedData?.pagination;

  // Filtrar categorias localmente
  const filteredCategories = allCategoriesFromAPI.filter(
    (category: Category) => {
      // Filtro por busca
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = category.translations?.some(t =>
          t.name.toLowerCase().includes(searchLower)
        );
        const slugMatch = category.slug.toLowerCase().includes(searchLower);
        if (!nameMatch && !slugMatch) return false;
      }

      return true;
    }
  );

  // Ordenar categorias
  const sortedCategories = [...filteredCategories].sort(
    (a: Category, b: Category) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case CategorySortField.NAME:
          aValue = getCategoryName(a.translations);
          bValue = getCategoryName(b.translations);
          break;
        case CategorySortField.CREATED_AT:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case CategorySortField.DISPLAY_ORDER:
        default:
          aValue = a.displayOrder;
          bValue = b.displayOrder;
          break;
      }

      if (sortOrder === SortOrder.ASC) {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    }
  );

  const categories = sortedCategories;

  // Converter categorias para opções do autocomplete
  const parentCategoryOptions: AutocompleteOption[] = [
    {
      value: '',
      label: 'Nenhuma (Categoria Principal)',
      description: 'Criar como categoria raiz',
    },
    ...allCategories.map((category: Category) => ({
      value: category.id,
      label: getCategoryName(category.translations),
      description:
        category.translations?.[0]?.description || `Slug: ${category.slug}`,
    })),
  ];

  const [formData, setFormData] = useState({
    slug: '',
    parentId: null as string | null,
    displayOrder: 0,
    active: true,
    translations: [
      { language: 'pt', name: '', description: '' },
      { language: 'en', name: '', description: '' },
    ],
  });

  // Service form data
  const [serviceFormData, setServiceFormData] = useState<CreateServiceData>({
    providerId: '',
    categoryId: '',
    title: '',
    description: '',
    price: undefined,
    status: 'ACTIVE',
  });

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTranslationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      translations: prev.translations.map((trans, i) =>
        i === index ? { ...trans, [field]: value } : trans
      ),
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.slug.trim()) {
      showError('Slug é obrigatório', 'Validação');
      return false;
    }

    // Verificar se slug já existe
    const slugExists = allCategories.some(
      cat => cat.slug === formData.slug.trim()
    );
    if (slugExists) {
      showError('Este slug já existe. Escolha outro.', 'Validação');
      return false;
    }

    const validTranslations = formData.translations.filter(
      t => t.name.trim() !== ''
    );
    if (validTranslations.length === 0) {
      showError('Pelo menos uma tradução com nome é obrigatória', 'Validação');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Preparar dados para envio
      const createData = {
        slug: formData.slug.trim(),
        parentId: formData.parentId || null,
        displayOrder: formData.displayOrder,
        translations: formData.translations.filter(t => t.name.trim() !== ''), // Só enviar traduções com nome
      };

      // Criar categoria usando a mutação
      await createCategoryMutation.mutateAsync(createData);

      // Mostrar toast de sucesso
      showSuccess('Categoria criada com sucesso!', 'Sucesso');

      // Limpar formulário
      setFormData({
        slug: '',
        parentId: null,
        displayOrder: 0,
        active: true,
        translations: [
          { language: 'pt', name: '', description: '' },
          { language: 'en', name: '', description: '' },
        ],
      });
      setShowAddModal(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao criar categoria:', error);

      // Mostrar toast de erro
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao criar categoria';
      showError(errorMessage, 'Erro');
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryToEdit) return;

    // Validação básica
    if (!editFormData.slug.trim()) {
      showError('Slug é obrigatório', 'Erro de Validação');
      return;
    }

    if (!editFormData.translations.some(t => t.name.trim())) {
      showError('Pelo menos um nome é obrigatório', 'Erro de Validação');
      return;
    }

    try {
      const updateData = {
        slug: editFormData.slug.trim(),
        parentId: editFormData.parentId || null,
        displayOrder: editFormData.displayOrder,
        active: editFormData.active,
        translations: editFormData.translations.filter(t => t.name.trim()),
      };

      await updateCategoryMutation.mutateAsync({
        id: categoryToEdit.id,
        data: updateData,
      });
      showSuccess('Categoria atualizada com sucesso!');
      setShowEditModal(false);
      setCategoryToEdit(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao atualizar categoria:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao atualizar categoria';
      showError(errorMessage, 'Erro');
    }
  };

  const toggleCategoryStatus = async (category: Category) => {
    try {
      await updateCategoryMutation.mutateAsync({
        id: category.id,
        data: { active: !category.active },
      });
      showSuccess(
        `Categoria "${getCategoryName(category.translations)}" ${
          category.active ? 'desativada' : 'ativada'
        } com sucesso!`
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao alterar status da categoria:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao alterar status da categoria';
      showError(errorMessage, 'Erro');
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    try {
      await deleteCategoryMutation.mutateAsync(category.id);
      showSuccess(
        `Categoria "${getCategoryName(category.translations)}" excluída com sucesso!`
      );
      setCategoryToDelete(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao excluir categoria:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao excluir categoria';
      showError(errorMessage, 'Erro');
    }
  };

  const handleRestoreCategory = async (category: Category) => {
    try {
      await restoreCategoryMutation.mutateAsync(category.id);
      showSuccess(
        `Categoria "${getCategoryName(category.translations)}" restaurada com sucesso!`
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao restaurar categoria:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao restaurar categoria';
      showError(errorMessage, 'Erro');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setShowInactive(false);
    setPage(1);
  };

  const handleSort = (column: CategorySortField) => {
    if (sortBy === column) {
      setSortOrder(
        sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
      );
    } else {
      setSortBy(column);
      setSortOrder(SortOrder.ASC);
    }
  };

  const openEditModal = (category: Category) => {
    setCategoryToEdit(category);
    setEditFormData({
      slug: category.slug,
      parentId: category.parentId || '',
      displayOrder: category.displayOrder,
      active: category.active,
      translations: [
        {
          language: 'pt',
          name:
            category.translations?.find(t => t.language === 'pt')?.name || '',
          description:
            category.translations?.find(t => t.language === 'pt')
              ?.description || '',
        },
        {
          language: 'en',
          name:
            category.translations?.find(t => t.language === 'en')?.name || '',
          description:
            category.translations?.find(t => t.language === 'en')
              ?.description || '',
        },
      ],
    });
    setShowEditModal(true);
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceFormData.title.trim()) {
      showError('Título é obrigatório', 'Validação');
      return;
    }

    if (!serviceFormData.categoryId) {
      showError('Categoria é obrigatória', 'Validação');
      return;
    }

    if (!serviceFormData.providerId) {
      showError('Provedor é obrigatório', 'Validação');
      return;
    }

    try {
      await createServiceMutation.mutateAsync(serviceFormData);
      showSuccess('Serviço criado com sucesso!', 'Sucesso');
      setServiceFormData({
        providerId: '',
        categoryId: '',
        title: '',
        description: '',
        price: undefined,
        status: 'ACTIVE',
      });
      setShowAddServiceModal(false);
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Erro ao criar serviço',
        'Erro'
      );
    }
  };

  // Sidebar menu items
  const sidebarItems = [
    {
      id: 'categories',
      label: 'Categorias',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
          />
        </svg>
      ),
      onClick: () => setActiveSection(AdminSection.CATEGORIES),
      active: activeSection === AdminSection.CATEGORIES,
    },
    {
      id: 'listings',
      label: 'Serviços',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
          />
        </svg>
      ),
      onClick: () => setActiveSection(AdminSection.LISTINGS),
      active: activeSection === AdminSection.LISTINGS,
    },
  ];

  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='bg-neutral-bg-card border-b border-neutral-border p-6'>
          <div className='flex justify-between items-center'>
            <div>
              <H1>Painel Administrativo</H1>
              <Body className='text-neutral-text-secondary'>
                Gerencie categorias e configurações do sistema
              </Body>
            </div>
            {activeSection === AdminSection.CATEGORIES && (
              <Button onClick={() => setShowAddModal(true)} variant='primary'>
                Adicionar Categoria
              </Button>
            )}
            {activeSection === AdminSection.LISTINGS && (
              <Button
                onClick={() => setShowAddServiceModal(true)}
                variant='primary'
              >
                Adicionar Serviço
              </Button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className='flex-1 p-6'>
          {activeSection === AdminSection.CATEGORIES && (
            <>
              {/* Estatísticas */}
              {stats && (
                <Card className='mb-6'>
                  <CardHeader>
                    <H3>Estatísticas</H3>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-blue-600'>
                          {stats.total}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Total
                        </Small>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-green-600'>
                          {stats.active}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Ativas
                        </Small>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-red-600'>
                          {stats.inactive}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Inativas
                        </Small>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-purple-600'>
                          {stats.withChildren}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Com Filhos
                        </Small>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Lista de Categorias */}
              <Card>
                <CardHeader>
                  <div className='flex justify-between items-center'>
                    <div>
                      <H2>Categorias</H2>
                      <Small className='text-neutral-text-secondary'>
                        {isLoading
                          ? 'Carregando...'
                          : `${categories.length} de ${pagination?.total || 0} categorias`}
                      </Small>
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => void refetch()}
                    >
                      Atualizar
                    </Button>
                  </div>
                </CardHeader>

                {/* Filtros */}
                <div className='px-6 py-4 border-b border-neutral-200 bg-neutral-50'>
                  <div className='flex items-center gap-4'>
                    {/* Busca */}
                    <div className='flex-1'>
                      <Input
                        placeholder='Buscar por nome ou slug...'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </div>

                    {/* Checkbox para mostrar inativas */}
                    <div className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        id='showInactive'
                        checked={showInactive}
                        onChange={e => setShowInactive(e.target.checked)}
                        className='rounded border-neutral-300'
                      />
                      <label
                        htmlFor='showInactive'
                        className='text-sm text-neutral-700'
                      >
                        Mostrar inativas
                      </label>
                    </div>

                    {/* Botão limpar */}
                    <Button variant='outline' size='sm' onClick={clearFilters}>
                      Limpar
                    </Button>
                  </div>

                  {/* Contador de resultados */}
                  <div className='mt-3 text-sm text-neutral-600'>
                    Mostrando {categories.length} de{' '}
                    {allCategoriesFromAPI.length} categorias
                    {searchTerm && (
                      <span className='ml-2'>
                        (filtrado por "{searchTerm}")
                      </span>
                    )}
                  </div>
                </div>

                <CardContent>
                  {isLoading ? (
                    <div className='flex items-center justify-center py-8'>
                      <Spinner size='lg' />
                      <span className='ml-2'>Carregando categorias...</span>
                    </div>
                  ) : error ? (
                    <div className='text-center py-8'>
                      <H3 className='text-red-600 mb-2'>
                        Erro ao carregar categorias
                      </H3>
                      <Body className='text-neutral-text-secondary mb-4'>
                        {error.message}
                      </Body>
                      <Button onClick={() => void refetch()}>
                        Tentar novamente
                      </Button>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead
                            sortable
                            sortDirection={
                              sortBy === CategorySortField.NAME
                                ? sortOrder
                                : null
                            }
                            onSort={() => handleSort(CategorySortField.NAME)}
                          >
                            Nome
                          </TableHead>
                          <TableHead>Slug</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead
                            sortable
                            sortDirection={
                              sortBy === CategorySortField.DISPLAY_ORDER
                                ? sortOrder
                                : null
                            }
                            onSort={() =>
                              handleSort(CategorySortField.DISPLAY_ORDER)
                            }
                          >
                            Ordem
                          </TableHead>
                          <TableHead
                            sortable
                            sortDirection={
                              sortBy === CategorySortField.CREATED_AT
                                ? sortOrder
                                : null
                            }
                            onSort={() =>
                              handleSort(CategorySortField.CREATED_AT)
                            }
                          >
                            Criado em
                          </TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categories.length === 0 ? (
                          <TableEmpty
                            colSpan={6}
                            message='Nenhuma categoria encontrada'
                          />
                        ) : (
                          categories.map((category: Category) => (
                            <TableRow key={category.id}>
                              <TableCell>
                                <div>
                                  <div className='font-medium'>
                                    {getCategoryName(category.translations)}
                                  </div>
                                  {category.translations?.[0]?.description && (
                                    <div className='text-sm text-neutral-500'>
                                      {category.translations[0].description}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <code className='text-sm bg-neutral-100 px-2 py-1 rounded'>
                                  {category.slug}
                                </code>
                              </TableCell>
                              <TableCell>
                                <div className='flex items-center gap-2'>
                                  <Badge
                                    variant={
                                      category.active ? 'success' : 'default'
                                    }
                                    size='sm'
                                  >
                                    {category.active ? 'Ativa' : 'Inativa'}
                                  </Badge>
                                  {category.parentId && (
                                    <Badge variant='info' size='sm'>
                                      Subcategoria
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className='text-sm text-neutral-600'>
                                  {category.displayOrder}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className='text-sm text-neutral-600'>
                                  {new Date(
                                    category.createdAt
                                  ).toLocaleDateString('pt-BR')}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Dropdown
                                  trigger={<MenuButton>⋮</MenuButton>}
                                  items={[
                                    createDropdownItems.edit(() => {
                                      openEditModal(category);
                                    }),
                                    {
                                      id: 'toggle-status',
                                      label: category.active
                                        ? 'Desativar'
                                        : 'Restaurar',
                                      icon: category.active ? (
                                        <svg
                                          className='w-4 h-4'
                                          fill='none'
                                          stroke='currentColor'
                                          viewBox='0 0 24 24'
                                        >
                                          <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z'
                                          />
                                        </svg>
                                      ) : (
                                        <svg
                                          className='w-4 h-4'
                                          fill='none'
                                          stroke='currentColor'
                                          viewBox='0 0 24 24'
                                        >
                                          <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                                          />
                                        </svg>
                                      ),
                                      onClick: () => {
                                        if (category.active) {
                                          void toggleCategoryStatus(category);
                                        } else {
                                          void handleRestoreCategory(category);
                                        }
                                      },
                                    },
                                    { id: 'divider', label: '', divider: true },
                                    createDropdownItems.delete(() => {
                                      setCategoryToDelete(category);
                                    }),
                                  ]}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  )}

                  {/* Paginação */}
                  {pagination && pagination.totalPages > 1 && (
                    <div className='mt-6 pt-4 border-t border-neutral-border'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setPage(page - 1)}
                            disabled={!pagination.hasPrev}
                          >
                            Anterior
                          </Button>
                          <Small className='text-neutral-text-secondary'>
                            Página {pagination.page} de {pagination.totalPages}
                          </Small>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setPage(page + 1)}
                            disabled={!pagination.hasNext}
                          >
                            Próxima
                          </Button>
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Mostrando {categories.length} de {pagination.total}{' '}
                          categorias
                        </Small>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === AdminSection.LISTINGS && (
            <>
              {/* Services Statistics */}
              {servicesStats && (
                <Card className='mb-6'>
                  <CardHeader>
                    <H3>Estatísticas de Serviços</H3>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-blue-600'>
                          {servicesStats.total}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Total
                        </Small>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-green-600'>
                          {servicesStats.active}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Ativos
                        </Small>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-red-600'>
                          {servicesStats.inactive}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Inativos
                        </Small>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-purple-600'>
                          {servicesStats.averagePrice > 0
                            ? `R$ ${servicesStats.averagePrice.toFixed(2)}`
                            : '-'}
                        </div>
                        <Small className='text-neutral-text-secondary'>
                          Preço Médio
                        </Small>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Services List */}
              <Card>
                <CardHeader>
                  <div className='flex justify-between items-center'>
                    <div>
                      <H2>Serviços</H2>
                      <Small className='text-neutral-text-secondary'>
                        {servicesLoading
                          ? 'Carregando...'
                          : `${servicesPaginatedData?.data?.length || 0} de ${servicesPaginatedData?.pagination?.total || 0} serviços`}
                      </Small>
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => void refetchServices()}
                    >
                      Atualizar
                    </Button>
                  </div>
                </CardHeader>

                {/* Services Filters */}
                <div className='px-6 py-4 border-b border-neutral-200 bg-neutral-50'>
                  <div className='flex items-center gap-4'>
                    <div className='flex-1'>
                      <Input
                        placeholder='Buscar por título...'
                        value={serviceSearchTerm}
                        onChange={e => setServiceSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        id='showInactiveServices'
                        checked={showInactiveServices}
                        onChange={e =>
                          setShowInactiveServices(e.target.checked)
                        }
                        className='rounded border-neutral-300'
                      />
                      <label
                        htmlFor='showInactiveServices'
                        className='text-sm text-neutral-700'
                      >
                        Mostrar inativos
                      </label>
                    </div>
                  </div>
                </div>

                <CardContent>
                  {servicesLoading ? (
                    <div className='flex items-center justify-center py-8'>
                      <Spinner size='lg' />
                      <span className='ml-2'>Carregando serviços...</span>
                    </div>
                  ) : servicesError ? (
                    <div className='text-center py-8'>
                      <H3 className='text-red-600 mb-2'>
                        Erro ao carregar serviços
                      </H3>
                      <Body className='text-neutral-text-secondary mb-4'>
                        {servicesError.message}
                      </Body>
                      <Button onClick={() => void refetchServices()}>
                        Tentar novamente
                      </Button>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Provedor</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Criado em</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(servicesPaginatedData?.data || []).length === 0 ? (
                          <TableEmpty
                            colSpan={7}
                            message='Nenhum serviço encontrado'
                          />
                        ) : (
                          (servicesPaginatedData?.data || [])
                            .filter((service: Service) => {
                              if (serviceSearchTerm) {
                                return service.title
                                  .toLowerCase()
                                  .includes(serviceSearchTerm.toLowerCase());
                              }
                              if (
                                !showInactiveServices &&
                                service.status === 'INACTIVE'
                              ) {
                                return false;
                              }
                              return true;
                            })
                            .map((service: Service) => (
                              <TableRow key={service.id}>
                                <TableCell>
                                  <div>
                                    <div className='font-medium'>
                                      {service.title}
                                    </div>
                                    {service.description && (
                                      <div className='text-sm text-neutral-500 truncate max-w-xs'>
                                        {service.description}
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <span className='text-sm text-neutral-600'>
                                    {service.category?.translations?.[0]
                                      ?.name ||
                                      service.category?.slug ||
                                      '-'}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className='text-sm text-neutral-600'>
                                    {service.provider?.user?.name || '-'}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className='text-sm text-neutral-600'>
                                    {service.price
                                      ? `R$ ${Number(service.price).toFixed(2)}`
                                      : '-'}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      service.status === 'ACTIVE'
                                        ? 'success'
                                        : 'default'
                                    }
                                    size='sm'
                                  >
                                    {service.status === 'ACTIVE'
                                      ? 'Ativo'
                                      : 'Inativo'}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <span className='text-sm text-neutral-600'>
                                    {new Date(
                                      service.createdAt
                                    ).toLocaleDateString('pt-BR')}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Dropdown
                                    trigger={<MenuButton>⋮</MenuButton>}
                                    items={[
                                      createDropdownItems.edit(() => {
                                        // TODO: Implement edit service functionality
                                        showSuccess(
                                          'Edit functionality coming soon!'
                                        );
                                      }),
                                      {
                                        id: 'toggle-status',
                                        label:
                                          service.status === 'ACTIVE'
                                            ? 'Desativar'
                                            : 'Ativar',
                                        icon:
                                          service.status === 'ACTIVE' ? (
                                            <svg
                                              className='w-4 h-4'
                                              fill='none'
                                              stroke='currentColor'
                                              viewBox='0 0 24 24'
                                            >
                                              <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z'
                                              />
                                            </svg>
                                          ) : (
                                            <svg
                                              className='w-4 h-4'
                                              fill='none'
                                              stroke='currentColor'
                                              viewBox='0 0 24 24'
                                            >
                                              <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                                              />
                                            </svg>
                                          ),
                                        onClick: () => {
                                          void (async () => {
                                            try {
                                              await updateServiceMutation.mutateAsync(
                                                {
                                                  id: service.id,
                                                  data: {
                                                    status:
                                                      service.status ===
                                                      'ACTIVE'
                                                        ? 'INACTIVE'
                                                        : 'ACTIVE',
                                                  },
                                                }
                                              );
                                              showSuccess(
                                                `Serviço "${service.title}" ${service.status === 'ACTIVE' ? 'desativado' : 'ativado'} com sucesso!`
                                              );
                                            } catch {
                                              showError(
                                                'Erro ao alterar status do serviço',
                                                'Erro'
                                              );
                                            }
                                          })();
                                        },
                                      },
                                      {
                                        id: 'divider',
                                        label: '',
                                        divider: true,
                                      },
                                      createDropdownItems.delete(() => {
                                        setServiceToDelete(service);
                                      }),
                                    ]}
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title='Adicionar Nova Categoria'
        size='xl'
      >
        <form onSubmit={e => void handleSubmit(e)}>
          <Stack spacing={4}>
            <Stack direction='row' spacing={4}>
              <Input
                label='Slug'
                placeholder='Ex: eletronicos'
                value={formData.slug}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('slug', e.target.value)
                }
                required
              />
              <div className='w-full'>
                <label className='block text-sm font-medium text-neutral-text-primary mb-2'>
                  Categoria Pai
                </label>
                <Autocomplete
                  options={parentCategoryOptions}
                  value={formData.parentId || ''}
                  onChange={value => handleInputChange('parentId', value || '')}
                  placeholder='Buscar categoria pai...'
                  emptyMessage='Nenhuma categoria encontrada'
                  searchable={true}
                />
              </div>
            </Stack>

            <Stack direction='row' spacing={4}>
              <Input
                label='Ordem de Exibição'
                type='number'
                value={formData.displayOrder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('displayOrder', parseInt(e.target.value))
                }
                required
              />
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='active'
                  checked={formData.active}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('active', e.target.checked)
                  }
                  className='rounded border-neutral-border'
                />
                <label
                  htmlFor='active'
                  className='text-sm font-medium text-neutral-text-primary'
                >
                  Categoria ativa
                </label>
              </div>
            </Stack>

            {/* Translations */}
            <div>
              <H3 className='mb-4'>Traduções</H3>
              <Stack spacing={4}>
                {formData.translations.map((trans, index) => (
                  <Card key={index} variant='outlined' padding='sm'>
                    <Stack spacing={3}>
                      <div className='flex items-center space-x-2'>
                        <Badge variant='info' size='sm'>
                          {trans.language.toUpperCase()}
                        </Badge>
                      </div>
                      <Stack direction='row' spacing={3}>
                        <Input
                          label='Nome'
                          placeholder={`Nome em ${trans.language === 'pt' ? 'Português' : 'English'}`}
                          value={trans.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleTranslationChange(
                              index,
                              'name',
                              e.target.value
                            )
                          }
                        />
                        <Input
                          label='Descrição'
                          placeholder={`Descrição em ${trans.language === 'pt' ? 'Português' : 'English'}`}
                          value={trans.description}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleTranslationChange(
                              index,
                              'description',
                              e.target.value
                            )
                          }
                        />
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </div>

            <Stack direction='row' spacing={3} className='pt-4'>
              <Button
                type='submit'
                variant='primary'
                disabled={createCategoryMutation?.isPending}
              >
                {createCategoryMutation?.isPending ? (
                  <>
                    <Spinner size='sm' />
                    <span className='ml-2'>Criando...</span>
                  </>
                ) : (
                  'Criar Categoria'
                )}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => setShowAddModal(false)}
                disabled={createCategoryMutation?.isPending}
              >
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setCategoryToEdit(null);
        }}
        title='Editar Categoria'
        size='xl'
      >
        <form onSubmit={e => void handleEditSubmit(e)}>
          <Stack spacing={6}>
            {/* Basic Info */}
            <Stack spacing={4}>
              <H3 className='text-lg font-semibold text-neutral-text-primary'>
                Informações Básicas
              </H3>
              <Stack direction='row' spacing={3}>
                <Input
                  label='Slug'
                  placeholder='categoria-exemplo'
                  value={editFormData.slug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditFormData(prev => ({
                      ...prev,
                      slug: e.target.value,
                    }))
                  }
                  required
                />
                <Input
                  label='Ordem de Exibição'
                  type='number'
                  min='0'
                  value={editFormData.displayOrder}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditFormData(prev => ({
                      ...prev,
                      displayOrder: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </Stack>

              {/* Parent Category */}
              <div>
                <label className='block text-sm font-medium text-neutral-text-primary mb-2'>
                  Categoria Pai
                </label>
                <Autocomplete
                  options={parentCategoryOptions}
                  value={editFormData.parentId}
                  onChange={value =>
                    setEditFormData(prev => ({
                      ...prev,
                      parentId: value,
                    }))
                  }
                  placeholder='Selecione uma categoria pai (opcional)'
                  searchable
                />
              </div>

              {/* Active Status */}
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='editActive'
                  checked={editFormData.active}
                  onChange={e =>
                    setEditFormData(prev => ({
                      ...prev,
                      active: e.target.checked,
                    }))
                  }
                  className='rounded border-neutral-300'
                />
                <label
                  htmlFor='editActive'
                  className='text-sm font-medium text-neutral-text-primary'
                >
                  Categoria ativa
                </label>
              </div>
            </Stack>

            {/* Translations */}
            <div>
              <H3 className='mb-4'>Traduções</H3>
              <Stack spacing={4}>
                {editFormData.translations.map((trans, index) => (
                  <Card key={index} variant='outlined' padding='sm'>
                    <Stack spacing={3}>
                      <div className='flex items-center space-x-2'>
                        <Badge variant='info' size='sm'>
                          {trans.language.toUpperCase()}
                        </Badge>
                      </div>
                      <Stack direction='row' spacing={3}>
                        <Input
                          label='Nome'
                          placeholder={`Nome em ${trans.language === 'pt' ? 'Português' : 'English'}`}
                          value={trans.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditFormData(prev => ({
                              ...prev,
                              translations: prev.translations.map((t, i) =>
                                i === index ? { ...t, name: e.target.value } : t
                              ),
                            }))
                          }
                        />
                        <Input
                          label='Descrição'
                          placeholder={`Descrição em ${trans.language === 'pt' ? 'Português' : 'English'}`}
                          value={trans.description}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditFormData(prev => ({
                              ...prev,
                              translations: prev.translations.map((t, i) =>
                                i === index
                                  ? { ...t, description: e.target.value }
                                  : t
                              ),
                            }))
                          }
                        />
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </div>

            <Stack direction='row' spacing={3} className='pt-4'>
              <Button
                type='submit'
                variant='primary'
                disabled={updateCategoryMutation?.isPending}
              >
                {updateCategoryMutation?.isPending ? (
                  <>
                    <Spinner size='sm' />
                    <span className='ml-2'>Salvando...</span>
                  </>
                ) : (
                  'Salvar Alterações'
                )}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setShowEditModal(false);
                  setCategoryToEdit(null);
                }}
                disabled={updateCategoryMutation?.isPending}
              >
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </form>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        title='Confirmar Exclusão'
        size='sm'
      >
        <div className='space-y-4'>
          <Body>
            Tem certeza que deseja excluir a categoria{' '}
            <strong>
              {categoryToDelete
                ? getCategoryName(categoryToDelete.translations)
                : ''}
            </strong>
            ?
          </Body>
          <Body className='text-neutral-text-secondary'>
            Esta ação não pode ser desfeita. Todos os dados relacionados a esta
            categoria serão perdidos.
          </Body>
          <div className='flex gap-2 justify-end'>
            <Button
              variant='outline'
              onClick={() => setCategoryToDelete(null)}
              disabled={deleteCategoryMutation?.isPending}
            >
              Cancelar
            </Button>
            <Button
              variant='outline'
              className='bg-red-600 text-white hover:bg-red-700 border-red-600'
              onClick={() =>
                categoryToDelete && void handleDeleteCategory(categoryToDelete)
              }
              disabled={deleteCategoryMutation?.isPending}
            >
              {deleteCategoryMutation?.isPending ? (
                <>
                  <Spinner size='sm' />
                  <span className='ml-2'>Excluindo...</span>
                </>
              ) : (
                'Excluir'
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Service Modal */}
      <Modal
        isOpen={showAddServiceModal}
        onClose={() => setShowAddServiceModal(false)}
        title='Adicionar Novo Serviço'
        size='lg'
      >
        <form onSubmit={e => void handleCreateService(e)}>
          <Stack spacing={4}>
            <Input
              label='Título'
              placeholder='Digite o título do serviço'
              value={serviceFormData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setServiceFormData(prev => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              required
            />

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-neutral-text-primary mb-2'>
                  Categoria
                </label>
                <Autocomplete
                  options={parentCategoryOptions.slice(1)} // Remove the "Nenhuma" option
                  value={serviceFormData.categoryId}
                  onChange={value =>
                    setServiceFormData(prev => ({
                      ...prev,
                      categoryId: value || '',
                    }))
                  }
                  placeholder='Selecionar categoria...'
                  emptyMessage='Nenhuma categoria encontrada'
                  searchable
                />
              </div>

              <Input
                label='ID do Provedor'
                placeholder='Digite o ID do provedor'
                value={serviceFormData.providerId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setServiceFormData(prev => ({
                    ...prev,
                    providerId: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <Input
                label='Preço (opcional)'
                type='number'
                step='0.01'
                min='0'
                placeholder='0.00'
                value={serviceFormData.price || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setServiceFormData(prev => ({
                    ...prev,
                    price: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  }))
                }
              />

              <div>
                <label className='block text-sm font-medium text-neutral-text-primary mb-2'>
                  Status
                </label>
                <select
                  value={serviceFormData.status}
                  onChange={e =>
                    setServiceFormData(prev => ({
                      ...prev,
                      status: e.target.value as 'ACTIVE' | 'INACTIVE',
                    }))
                  }
                  className='w-full px-3 py-2 border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='ACTIVE'>Ativo</option>
                  <option value='INACTIVE'>Inativo</option>
                </select>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-neutral-text-primary mb-2'>
                Descrição (opcional)
              </label>
              <textarea
                placeholder='Digite uma descrição para o serviço...'
                value={serviceFormData.description || ''}
                onChange={e =>
                  setServiceFormData(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
                className='w-full px-3 py-2 border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical'
              />
            </div>

            <Stack direction='row' spacing={3} className='pt-4'>
              <Button
                type='submit'
                variant='primary'
                disabled={createServiceMutation?.isPending}
              >
                {createServiceMutation?.isPending ? (
                  <>
                    <Spinner size='sm' />
                    <span className='ml-2'>Criando...</span>
                  </>
                ) : (
                  'Criar Serviço'
                )}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => setShowAddServiceModal(false)}
                disabled={createServiceMutation?.isPending}
              >
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </form>
      </Modal>

      {/* Service Delete Modal */}
      <Modal
        isOpen={!!serviceToDelete}
        onClose={() => setServiceToDelete(null)}
        title='Confirmar Exclusão'
        size='sm'
      >
        <div className='space-y-4'>
          <Body>
            Tem certeza que deseja excluir o serviço{' '}
            <strong>{serviceToDelete?.title || ''}</strong>?
          </Body>
          <Body className='text-neutral-text-secondary'>
            Esta ação não pode ser desfeita. Todos os dados relacionados a este
            serviço serão perdidos.
          </Body>
          <div className='flex gap-2 justify-end'>
            <Button
              variant='outline'
              onClick={() => setServiceToDelete(null)}
              disabled={deleteServiceMutation?.isPending}
            >
              Cancelar
            </Button>
            <Button
              variant='outline'
              className='bg-red-600 text-white hover:bg-red-700 border-red-600'
              onClick={() => {
                if (serviceToDelete) {
                  void (async () => {
                    try {
                      await deleteServiceMutation.mutateAsync(
                        serviceToDelete.id
                      );
                      showSuccess(
                        `Serviço "${serviceToDelete.title}" excluído com sucesso!`
                      );
                      setServiceToDelete(null);
                    } catch {
                      showError('Erro ao excluir serviço', 'Erro');
                    }
                  })();
                }
              }}
              disabled={deleteServiceMutation?.isPending}
            >
              {deleteServiceMutation?.isPending ? (
                <>
                  <Spinner size='sm' />
                  <span className='ml-2'>Excluindo...</span>
                </>
              ) : (
                'Excluir'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
