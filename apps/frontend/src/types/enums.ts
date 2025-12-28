// /Users/thiagotavares/Projects/Services/apps/frontend/src/types/enums.ts

/**
 * Enum para idiomas suportados
 */
export enum Language {
  PT_PT = 'pt-PT',
  PT_BR = 'pt-BR',
  EN_US = 'en-US',
}

/**
 * Enum para status de categoria
 */
export enum CategoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

/**
 * Enum para tipos de ordenação
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Enum para campos de ordenação de categoria
 */
export enum CategorySortField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  DISPLAY_ORDER = 'displayOrder',
  UPDATED_AT = 'updatedAt',
}

/**
 * Enum para seções do admin
 */
export enum AdminSection {
  CATEGORIES = 'categories',
  USERS = 'users',
  LISTINGS = 'listings',
  SETTINGS = 'settings',
}

/**
 * Enum para tipos de notificação
 */
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

/**
 * Enum para tamanhos de modal
 */
export enum ModalSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  FULL = 'full',
}

/**
 * Enum para variantes de botão
 */
export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline',
  GHOST = 'ghost',
  DESTRUCTIVE = 'destructive',
}

/**
 * Enum para tamanhos de botão
 */
export enum ButtonSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

/**
 * Enum para variantes de badge
 */
export enum BadgeVariant {
  DEFAULT = 'default',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

/**
 * Enum para variantes de card
 */
export enum CardVariant {
  DEFAULT = 'default',
  OUTLINED = 'outlined',
  ELEVATED = 'elevated',
}

/**
 * Enum para direções de stack
 */
export enum StackDirection {
  ROW = 'row',
  COLUMN = 'column',
}

/**
 * Enum para tipos de input
 */
export enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  TEL = 'tel',
  URL = 'url',
  SEARCH = 'search',
}

/**
 * Enum para tipos de dropdown item
 */
export enum DropdownItemType {
  ACTION = 'action',
  DIVIDER = 'divider',
  HEADER = 'header',
}

/**
 * Utilitários para trabalhar com enums
 */
export const EnumUtils = {
  /**
   * Converte string para enum de idioma
   */
  toLanguage: (value: string): Language => {
    if (Object.values(Language).includes(value as Language)) {
      return value as Language;
    }
    return Language.PT_BR;
  },

  /**
   * Converte string para enum de status de categoria
   */
  toCategoryStatus: (value: string): CategoryStatus => {
    if (Object.values(CategoryStatus).includes(value as CategoryStatus)) {
      return value as CategoryStatus;
    }
    return CategoryStatus.ACTIVE;
  },

  /**
   * Converte string para enum de ordem de classificação
   */
  toSortOrder: (value: string): SortOrder => {
    if (Object.values(SortOrder).includes(value as SortOrder)) {
      return value as SortOrder;
    }
    return SortOrder.ASC;
  },

  /**
   * Converte string para enum de campo de ordenação
   */
  toCategorySortField: (value: string): CategorySortField => {
    if (Object.values(CategorySortField).includes(value as CategorySortField)) {
      return value as CategorySortField;
    }
    return CategorySortField.DISPLAY_ORDER;
  },

  /**
   * Verifica se um valor é um idioma válido
   */
  isValidLanguage: (value: string): boolean => {
    return Object.values(Language).includes(value as Language);
  },

  /**
   * Obtém o idioma padrão
   */
  getDefaultLanguage: (): Language => {
    return Language.PT_BR;
  },

  /**
   * Obtém o idioma de fallback
   */
  getFallbackLanguage: (): Language => {
    return Language.EN_US;
  },
};
