'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

export default function ReactQueryProvider({ children }: Props) {
  const { push } = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error) => {
          const axiosError = error as any;
          if (axiosError.response?.status === 500) {
            push('/internal-server-error');
          }

          if (
            axiosError.response?.data?.error?.message === 'NOT_LOGGED_IN' ||
            axiosError.response?.data?.error?.message === 'EXPIRED_REFRESH_ACCESS_TOKEN'
          ) {
            push('/users/login');
          }
        },
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
