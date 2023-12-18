import '@/styles/reset.css';
import '@/styles/react-toastify.css';
import '@/styles/sweet-alert2.css';
import '@/styles/global.css';

import React from 'react';

import { Roboto } from 'next/font/google';

import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';

import CoreProvider from '@/providers/CoreProvider';

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
        <CoreProvider>
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </CoreProvider>
      </body>
    </html>
  );
}
