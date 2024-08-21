'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import mutateCustomErrorAlert from '@/apis/common/mutate-custom-error-alert';

type Props = {
  children: React.ReactNode;
};

export default function ReactQueryProvider({ children }: Props) {
  const { push } = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: async (error) => {
          const axiosError = error as any;

          if (axiosError.response?.status === 500) {
            push('/internal-server-error');
          }

          const errorCode = axiosError.response?.data?.error?.code;
          switch (errorCode) {
            case 'AU001':
              push('/users/login');
              break;
            case 'J102':
              push('/users/login');
              break;
            case 'J103':
              push('/users/login');
              break;
            case 'AU005':
              break;
            default:
              await mutateCustomErrorAlert(axiosError);
              break;
          }
        },
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
