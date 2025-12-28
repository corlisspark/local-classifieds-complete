import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTranslations } from '../../app/providers/I18nProvider';

// Mock the I18nProvider context
jest.mock('../../app/providers', () => ({
  useI18n: () => ({
    t: (key: string) => key,
    loadNamespace: jest.fn(),
    isLoading: false,
  }),
}));

describe('useTranslations', () => {
  it('returns translation function', () => {
    const { result } = renderHook(() => useTranslations('common'));

    expect(typeof result.current.t).toBe('function');
  });

  it('translates keys correctly', () => {
    const { result } = renderHook(() => useTranslations('common'));

    const translation = result.current.t('title');
    expect(translation).toBe('common.title');
  });

  it('returns loading state', () => {
    const { result } = renderHook(() => useTranslations('common'));

    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
