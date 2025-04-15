'use client';

import '@/styles/error.css';

import Image from 'next/image';

import useClientI18n from '@/hooks/useClientI18n';

import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useClientI18n('not-found-error');

  return (
    <div className="root">
      <h1 className="title">{t('not_found_error_title')}</h1>
      <p className="content">{t('not_found_error_description')}</p>
      <Image className="image" src="/images/error/404.svg" alt="404" title="404" width={320} height={240} />
      <Link href="/" replace className="homeLink">
        {t('not_found_error_home_link')}
      </Link>
    </div>
  );
}
