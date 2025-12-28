'use client';

import { useI18n } from '../app/providers/I18nProvider';
import { Language } from '../types/enums';

export default function LanguageSwitcher() {
  const { t, locale, setLocale } = useI18n();

  const switchLanguage = (newLocale: Language) => {
    setLocale(newLocale);
  };

  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm text-gray-600'>{t('language')}:</span>
      <div className='flex gap-2'>
        <button
          onClick={() => switchLanguage(Language.PT_BR)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === Language.PT_BR
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('portuguese_br')}
        </button>
        <button
          onClick={() => switchLanguage(Language.PT_PT)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === Language.PT_PT
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('portuguese_pt')}
        </button>
        <button
          onClick={() => switchLanguage(Language.EN_US)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === Language.EN_US
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('english')}
        </button>
      </div>
    </div>
  );
}
