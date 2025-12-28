'use client';

import { useState } from 'react';
import { apiClient } from '@/services/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
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
      await apiClient.post('/auth/register', formData);
      setMessage('Registration successful! You can now login.');
      setFormData({ name: '', email: '', password: '' });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
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
            Criar Conta
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Cadastre-se gratuitamente
          </p>
        </div>
        <form
          className='mt-8 space-y-6'
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
        >
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <input
                type='text'
                required
                placeholder='Nome completo'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className='relative block w-full px-3 py-2 border border-gray-300 rounded-t-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
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
                className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
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
                className='relative block w-full px-3 py-2 border border-gray-300 rounded-b-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          </div>

          {message && (
            <div
              className={`text-center text-sm ${
                message.includes('successful') ? 'text-green-600' : 'text-red-600'
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
              {isLoading ? 'Criando...' : 'Criar Conta'}
            </button>
          </div>

          <div className='text-center'>
            <a
              href='/login'
              className='text-indigo-600 hover:text-indigo-500'
            >
              Já tem conta? Faça login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
