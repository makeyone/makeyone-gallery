'use client';

import { useTranslations } from 'next-intl';

import i18nNamespaces from '@/i18n/namespace';

export type I18nNamespace = keyof typeof i18nNamespaces;
const useClientI18n = (namespace: I18nNamespace) => {
  const t = useTranslations(i18nNamespaces[namespace]);

  return t;
};

export default useClientI18n;
