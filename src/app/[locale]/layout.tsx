import '@/styles/reset.css';
import '@/styles/react-toastify.css';
import '@/styles/sweet-alert2.css';
import '@/styles/toast-ui-editor.css';
import '@/styles/global.css';

import React, { Suspense } from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Analytics } from '@vercel/analytics/react';
import { Roboto } from 'next/font/google';

import { FRONT_SERVER_URL } from '@/constants/environment';

import useServerI18n from '@/hooks/useServerI18n';

import CoreProvider from '@/providers/CoreProvider';

import { routing } from '@/i18n/routing';

export async function generateMetadata(): Promise<Metadata> {
  const t = await useServerI18n('global');

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
    robots: 'all, index, follow',
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: FRONT_SERVER_URL,
      siteName: t('makeyone'),
      images: [
        {
          url: 'https://www.makeyone.com/images/default_og.png',
          width: 1200,
          height: 630,
          alt: 'makeyone',
        },
      ],
      type: 'website',
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const roboto = Roboto({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700'],
});

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={roboto.className}>
      <head>
        <meta name="naver-site-verification" content="b33c85465e1d241422cf3893fe6e41972ff0e11b" />
      </head>
      <body suppressHydrationWarning>
        <Suspense fallback={<React.Fragment />}>
          <CoreProvider>{children}</CoreProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
