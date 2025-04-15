import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { Language, languageCodes } from '@/constants/enum/Language.enum';

export const routing = defineRouting({
  locales: languageCodes,
  defaultLocale: Language['en-US'].code,
});

export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
