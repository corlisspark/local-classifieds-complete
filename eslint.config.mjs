// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'eslint.config.mjs',
      'node_modules/',
      'dist/',
      'build/',
      '.next/',
      'out/',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      'apps/**/.next/**',
      'coverage/',
      '**/*.config.mjs',
      '**/*.config.js',
      '**/next-env.d.ts',
      '**/libs/**/*.js',
      '**/libs/**/*.d.ts',
    ],
  },

  // Base configuration for all files
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,

  // Common rules for all TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
    },
  },

  // Backend (NestJS API) specific rules
  {
    files: ['apps/api/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        project: ['./apps/api/tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // NestJS-specific tweaks can go here
    },
  },

  // Frontend (Next.js) specific rules
  {
    files: ['apps/frontend/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
      },
      sourceType: 'commonjs',
      parserOptions: {
        project: ['./apps/frontend/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: true,
      },
    },
    rules: {
      // React/Next-specific tweaks can go here
    },
  },

  // TypeScript recommended rules (only for TS files)
  ...tseslint.configs.recommendedTypeChecked,

  // Test files - must come after TypeScript rules to override them
  {
    files: [
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/*.test.tsx',
      '**/*.spec.tsx',
      '**/__tests__/**/*.ts',
      '**/__tests__/**/*.tsx',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['apps/frontend/src/utils/cn.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  {
    files: ['apps/frontend/src/app/providers/I18nProvider.tsx'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      'no-console': ['error', { allow: ['error'] }],
    },
  },
];
