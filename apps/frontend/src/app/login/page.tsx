'use client';

import { useState } from 'react';
import { apiClient } from '@/services/api';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await apiClient.post('/auth/login', formData);
      setMessage('Login successful!');
      // Store token if needed (but no localStorage as requested)
      // eslint-disable-next-line no-console
      console.log('Login response:', response);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
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
            Fazer Login
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Entre na sua conta
          </p>
        </div>
        <form
          className='mt-8 space-y-6'
          onSubmit={e => {
            void handleSubmit(e);
          }}
        >
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <input
                type='email'
                required
                placeholder='Email'
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className='relative block w-full px-3 py-2 border border-gray-300 rounded-t-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <div>
              <input
                type='password'
                required
                placeholder='Senha'
                value={formData.password}
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className='relative block w-full px-3 py-2 border border-gray-300 rounded-b-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          </div>

          {message && (
            <div
              className={`text-center text-sm ${
                message.includes('successful')
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {message}
            </div>
          )}

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          <div className='text-center'>
            <a href='/register' className='text-indigo-600 hover:text-indigo-500'>
              Não tem conta? Cadastre-se
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
