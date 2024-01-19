import React from 'react';

import ProgressBarProvider from '@/providers/ProgressBarProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import SessionProvider from '@/providers/SessionProvider';
import ToastifyProvider from '@/providers/ToastifyProvider';

type Props = {
  children: React.ReactNode;
};

export default function CoreProvider({ children }: Props) {
  return (
    <>
      <ToastifyProvider />
      <ProgressBarProvider />
      <ReactQueryProvider>
        <SessionProvider>{children}</SessionProvider>
      </ReactQueryProvider>
    </>
  );
}
