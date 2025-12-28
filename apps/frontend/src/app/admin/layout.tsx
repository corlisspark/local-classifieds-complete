// apps/frontend/src/app/admin/layout.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-neutral-bg-light'>
      {/* Header */}
      <header className='bg-white border-b border-neutral-border shadow-sm'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <h1 className='text-xl font-semibold text-neutral-text-primary'>
                Admin
              </h1>
            </div>

            <div className='flex items-center gap-3'>
              <Button variant='outline' size='sm' onClick={() => router.back()}>
                ← Voltar
              </Button>
              <Link href='/'>
                <Button variant='outline' size='sm'>
                  🏠 Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1'>{children}</main>
    </div>
  );
}
