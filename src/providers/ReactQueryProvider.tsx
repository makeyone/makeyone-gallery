'use client';

import React from 'react';
import { toast } from 'react-toastify';

import { notFound, useRouter } from 'next/navigation';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { AuthMutation } from '@/api/auth/Auth.mutation';
import { ApiResponse } from '@/api/support/response/ApiResponse';

type Props = {
  children: React.ReactNode;
};

export default function ReactQueryProvider({ children }: Props) {
  const { replace } = useRouter();

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
          const signOutRes = await AuthMutation.signOut();

          switch (errorCode) {
            case 'NOT_LOGGED_IN':
              replace('/users/login');
              break;
            case 'NON_EXISTENT_USER':
              signOutRes.result === 'SUCCESS' && replace('/users/login');
              break;
            case 'NOT_ACTIVED_USER':
              signOutRes.result === 'SUCCESS' && replace('/users/login');
              break;
            case 'INVALID_JWT_ACCESS_TOKEN':
              signOutRes.result === 'SUCCESS' && replace('/users/login');
              break;
            case 'DO_NOT_HAVE_PERMISSION':
              notFound();
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
