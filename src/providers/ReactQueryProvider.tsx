'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type Props = {
  children: React.ReactNode;
};

export default function ReactQueryProvider({ children }: Props) {
  const { push } = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error) => {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 500) {
            push('/internal-server-error');
          }
        },
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
