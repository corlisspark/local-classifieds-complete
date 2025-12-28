'use client';

import { useState } from 'react';
import { apiClient } from '@/services/api';

export default function ProviderRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // First create the user account
      await apiClient.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setMessage(
        'Cadastro realizado com sucesso! Agora você pode fazer login.'
      );
      setFormData({ name: '', email: '', password: '', phone: '', bio: '' });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro no cadastro';
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Cadastro de Prestador
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Cadastre-se e comece a receber clientes
          </p>
        </div>
        <form
          className='mt-8 space-y-6'
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
        >
          <div className='space-y-4'>
            <div>
              <input
                type='text'
                required
                placeholder='Nome completo'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className='relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <div>
              <input
                type='email'
                required
                placeholder='Email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className='relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <div>
              <input
                type='password'
                required
                placeholder='Senha (mín. 6 caracteres)'
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className='relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <div>
              <input
                type='tel'
                placeholder='Telefone/WhatsApp (opcional)'
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className='relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <div>
              <textarea
                rows={3}
                placeholder='Conte sobre você e seus serviços (opcional)'
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className='relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          </div>

          {message && (
            <div
              className={`text-center text-sm ${
                message.includes('sucesso') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </div>
          )}

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50'
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar como Prestador'}
            </button>
          </div>

          <div className='text-center space-y-2'>
            <div>
              <a
                href='/login'
                className='text-indigo-600 hover:text-indigo-500'
              >
                Já tem conta? Faça login
              </a>
            </div>
            <div>
              <a href='/register' className='text-gray-600 hover:text-gray-500'>
                Cadastro simples (não prestador)
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
