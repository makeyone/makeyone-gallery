import React from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { getMessages } from 'next-intl/server';

import ProgressBarProvider from '@/providers/ProgressBarProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import SessionProvider from '@/providers/SessionProvider';
import ToastifyProvider from '@/providers/ToastifyProvider';

type Props = {
  children: React.ReactNode;
};

export default async function CoreProvider({ children }: Props) {
  const messages = await getMessages();

  return (
    <React.Fragment>
      <NextIntlClientProvider messages={messages}>
        <ToastifyProvider />
        <ProgressBarProvider />
        <ReactQueryProvider>
          <SessionProvider>{children}</SessionProvider>
        </ReactQueryProvider>
      </NextIntlClientProvider>
    </React.Fragment>
  );
}
