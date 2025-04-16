import { getRequestConfig } from 'next-intl/server';

import i18nNamespaces from '@/i18n/namespace';
import { Locale, routing } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const messages: Record<string, any> = {};

  for (const namespace of Object.values(i18nNamespaces)) {
    messages[namespace] = (await import(`@/public/locales/${locale}/${namespace}.json`)).default;
  }

  return {
    locale,
    messages,
    timeZone: 'Asia/Seoul',
  };
});
