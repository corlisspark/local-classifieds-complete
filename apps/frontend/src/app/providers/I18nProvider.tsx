'use client';

import React, { createContext, useContext, useState } from 'react';
import { Language } from '../../types/enums';

// Import all translations statically
import ptBRCommon from '../../i18n/pt-BR/common.json';
import ptPTCommon from '../../i18n/pt-PT/common.json';
import enUSCommon from '../../i18n/en-US/common.json';

type Locale = Language;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Static translations object (namespace -> key -> value)
const translations: Record<Locale, Record<string, Record<string, unknown>>> = {
  [Language.PT_BR]: { common: ptBRCommon as Record<string, unknown> },
  [Language.PT_PT]: { common: ptPTCommon as Record<string, unknown> },
  [Language.EN_US]: { common: enUSCommon as Record<string, unknown> },
};

export function I18nProvider({
  children,
  initialLocale = Language.PT_BR,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const t = (key: string, params?: Record<string, string>) => {
    const [namespace, ...keyParts] = key.split('.');
    const translationKey = keyParts.join('.');

    // Try to get translation from current locale
    const direct = translations[locale]?.[namespace]?.[translationKey];
    let translation: string | undefined =
      typeof direct === 'string' ? direct : undefined;

    // If not found, try common namespace as fallback
    if (!translation && namespace !== 'common') {
      const commonVal = translations[locale]?.common?.[translationKey];
      translation = typeof commonVal === 'string' ? commonVal : translation;
    }

    // If still not found, try English as fallback
    if (!translation && locale !== Language.EN_US) {
      const enDirect =
        translations[Language.EN_US]?.[namespace]?.[translationKey];
      translation = typeof enDirect === 'string' ? enDirect : translation;
      if (!translation && namespace !== 'common') {
        const enCommon = translations[Language.EN_US]?.common?.[translationKey];
        translation = typeof enCommon === 'string' ? enCommon : translation;
      }
    }

    // If still not found, return the key itself
    if (!translation) {
      translation = key;
    }

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation?.replace(`{{${param}}}`, value);
      });
    }

    return translation;
  };

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  const value = {
    locale,
    setLocale: handleSetLocale,
    t,
    isLoading: false, // No loading needed with static imports
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Hook for loading specific namespaces (simplified)
export function useTranslations(namespace: string) {
  const { t, isLoading } = useI18n();

  return {
    t: (key: string, params?: Record<string, string>) =>
      t(`${namespace}.${key}`, params),
    isLoading,
  };
}
