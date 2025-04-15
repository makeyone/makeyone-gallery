import { getTranslations } from 'next-intl/server';

import i18nNamespaces from '@/i18n/namespace';

type I18nNamespace = keyof typeof i18nNamespaces;
const useServerI18n = async (namespace: I18nNamespace) => {
  const t = await getTranslations(i18nNamespaces[namespace]);

  return t;
};

export default useServerI18n;
