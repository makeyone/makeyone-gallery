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
            // push('/internal-server-error');
          }

          const errorCode = axiosError.response?.data?.error?.code;
          switch (errorCode) {
            case 'NOT_LOGGED_IN':
              push('/users/login');
              break;
            case 'NON_EXISTENT_USER':
              // TODO: jwt 날리기
              push('/users/login');
              break;
            case 'NOT_ACTIVED_USER':
              // TODO: jwt 날리기
              push('/users/login');
              break;
            case 'DO_NOT_HAVE_PERMISSION':
              // TODO: jwt 날리기
              push('/users/login');
              break;
            case 'INVALID_JWT_ACCESS_TOKEN':
              // TODO: jwt 날리기
              push('/users/login');
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
