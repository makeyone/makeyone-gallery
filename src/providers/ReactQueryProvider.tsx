'use client';

import React from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { ApiResponse } from '@/api/support/response/ApiResponse';

type Props = {
  children: React.ReactNode;
};

export default function ReactQueryProvider({ children }: Props) {
  const { push } = useRouter();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: async (res: Error) => {
          const errorResponse = res as unknown as ApiResponse<null, null>;
          const errorCode = errorResponse?.error?.code;
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
              break;
          }

          if (errorResponse.error?.message) {
            return toast.error(errorResponse.error.message);
          }
        },
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
