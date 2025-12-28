// /Users/thiagotavares/Projects/Services/apps/frontend/src/hooks/useTranslations.ts

import { useMemo } from 'react';
import type { CategoryTranslation } from '../services/categories';
import { Language } from '../types/enums';

export interface TranslationFallback {
  language: string;
  fallbackLanguage: string;
}

/**
 * Hook para gerenciar traduções de categoria com fallback
 * @param translations Array de traduções da categoria
 * @param preferredLanguage Idioma preferido (padrão: 'pt')
 * @param fallbackLanguage Idioma de fallback (padrão: 'pt')
 */
export function useCategoryTranslations(
  translations: CategoryTranslation[] = [],
  preferredLanguage: Language = Language.PT_BR,
  fallbackLanguage: Language = Language.EN_US
) {
  return useMemo(() => {
    // Função para buscar tradução por idioma
    const getTranslation = (language: string): CategoryTranslation | null => {
      return translations.find(t => t.language === language) || null;
    };

    // Função para buscar tradução com fallback
    const getTranslationWithFallback = (
      language: string
    ): CategoryTranslation | null => {
      const translation = getTranslation(language);
      if (translation) return translation;

      // Se não encontrou, tenta o fallback
      const fallback = getTranslation(fallbackLanguage);
      if (fallback) return fallback;

      // Se não encontrou nem o fallback, retorna a primeira tradução disponível
      return translations[0] || null;
    };

    // Tradução preferida
    const preferred = getTranslationWithFallback(preferredLanguage);

    // Tradução de fallback
    const fallback = getTranslation(fallbackLanguage);

    // Todas as traduções disponíveis
    const availableLanguages = translations.map(t => t.language);

    // Verifica se tem tradução no idioma preferido
    const hasPreferredLanguage = !!getTranslation(preferredLanguage);

    // Verifica se tem tradução de fallback
    const hasFallbackLanguage = !!fallback;

    return {
      // Tradução principal (com fallback automático)
      translation: preferred,

      // Tradução específica por idioma
      getTranslation,
      getTranslationWithFallback,

      // Informações sobre disponibilidade
      hasPreferredLanguage,
      hasFallbackLanguage,
      availableLanguages,

      // Traduções específicas
      preferred,
      fallback,

      // Dados úteis
      name: preferred?.name || 'Sem nome',
      description: preferred?.description || '',
      language: preferred?.language || fallbackLanguage,
    };
  }, [translations, preferredLanguage, fallbackLanguage]);
}

/**
 * Hook para gerenciar múltiplas categorias com traduções
 */
export function useCategoriesTranslations(
  categories: Array<{ translations: CategoryTranslation[] }> = [],
  preferredLanguage: Language = Language.PT_BR,
  fallbackLanguage: Language = Language.EN_US
) {
  return useMemo(() => {
    return categories.map(category => ({
      ...category,
      translation: useCategoryTranslations(
        category.translations,
        preferredLanguage,
        fallbackLanguage
      ),
    }));
  }, [categories, preferredLanguage, fallbackLanguage]);
}

/**
 * Utilitário para obter nome da categoria com fallback
 */
export function getCategoryName(
  translations: CategoryTranslation[] = [],
  preferredLanguage: Language = Language.PT_BR,
  fallbackLanguage: Language = Language.EN_US
): string {
  const translation =
    translations.find(t => t.language === String(preferredLanguage)) ||
    translations.find(t => t.language === String(fallbackLanguage)) ||
    translations[0];

  return translation?.name || 'Sem nome';
}

/**
 * Utilitário para obter descrição da categoria com fallback
 */
export function getCategoryDescription(
  translations: CategoryTranslation[] = [],
  preferredLanguage: Language = Language.PT_BR,
  fallbackLanguage: Language = Language.EN_US
): string {
  const translation =
    translations.find(t => t.language === String(preferredLanguage)) ||
    translations.find(t => t.language === String(fallbackLanguage)) ||
    translations[0];

  return translation?.description || '';
}

// Alias para compatibilidade (removido para evitar conflito)
