import '@/styles/reset.css';
import '@/styles/react-toastify.css';
import '@/styles/sweet-alert2.css';
import '@/styles/toast-ui-editor.css';
import '@/styles/global.css';

import React, { Suspense } from 'react';

import { Metadata } from 'next';

import { Roboto } from 'next/font/google';

import { FRONT_SERVER_URL } from '@/constants/environment';

import CoreProvider from '@/providers/CoreProvider';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '내 커스텀키보드 노트 - 메이키원',
    description: '내가 만든 커스텀키보드를 명확하게 정리, 기록해봐요.',
    keywords: ['커스텀 키보드', '기계식 키보드', '키보드', '키캡', '키보드 스위치', '메이키원'],
    robots: 'all, index, follow',
    openGraph: {
      title: '내 커스텀키보드 노트 - 메이키원',
      description: '내가 만든 커스텀키보드를 명확하게 정리, 기록해봐요.',
      url: FRONT_SERVER_URL,
      siteName: 'MakeyOne',
      images: [
        {
          url: 'https://www.makeyone.com/images/default_og.png',
          width: 1200,
          height: 630,
          alt: '메이키원',
        },
      ],
      type: 'website',
    },
  };
}

type Props = {
  children: React.ReactNode;
};

const roboto = Roboto({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700'],
});

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={roboto.className}>
      <body suppressHydrationWarning>
        <Suspense fallback={<React.Fragment />}>
          <CoreProvider>{children}</CoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
