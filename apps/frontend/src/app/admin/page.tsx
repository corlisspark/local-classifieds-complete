'use client';

import Link from 'next/link';
import { useTranslations } from '../providers/I18nProvider';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { Button, Card, CardContent, H1, H2, Body } from '../../components/ui';

export default function AdminHome() {
  const { t } = useTranslations('common');

  const routes = [
    {
      title: 'Dashboard Admin',
      description: 'Painel administrativo para gerenciar categorias e usuários',
      href: '/admin/dashboard',
      variant: 'primary' as const,
    },
    {
      title: 'Demo de Componentes',
      description:
        'Demonstração de todos os componentes UI disponíveis e sistema de cores',
      href: '/admin/components-demo',
      variant: 'secondary' as const,
    },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <H1>{t('title')}</H1>
        <LanguageSwitcher />
      </div>

      <div className='mb-8'>
        <Card>
          <CardContent className='p-6'>
            <H2 className='mb-4'>{t('welcome')}</H2>
            <Body className='text-neutral-600'>{t('description')}</Body>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {routes.map(route => (
          <Card key={route.href} className='hover:shadow-lg transition-shadow'>
            <CardContent className='p-6'>
              <H2 className='text-lg mb-3'>{route.title}</H2>
              <Body className='text-neutral-600 mb-4'>{route.description}</Body>
              <Link href={route.href}>
                <Button variant={route.variant} className='w-full'>
                  Acessar
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='mt-8 p-4 bg-neutral-100 rounded-lg'>
        <H2 className='text-lg mb-2'>🚧 Em Desenvolvimento</H2>
        <Body className='text-neutral-600'>
          As seguintes seções estão sendo desenvolvidas: About, Categories,
          Users
        </Body>
      </div>
    </div>
  );
}
