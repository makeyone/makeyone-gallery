'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';

import { AuthMutation } from '@/api/auth/Auth.mutation';
import { SignInReq } from '@/api/auth/request/SignInReq';
import { SignInErrorData } from '@/api/auth/response/SignInRes';
import { SignInViewModel } from '@/api/auth/view-model/SignInViewModel';
import { ApiResponse } from '@/api/support/response/ApiResponse';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';

import PageLoading from '@/components/Loading/PageLoading';

export default function Login() {
  const { replace } = useRouter();

  const { data: socialLoginUserData } = useSession();
  const { mutate } = useMutation<ViewModelMapper<SignInViewModel | null>, ApiResponse<null, SignInErrorData>, SignInReq>({
    mutationFn: AuthMutation.signIn,
    onSuccess: () => {
      replace('/');
    },
    onError: async (res) => {
      const errorCode = res.error?.code;

      if (errorCode === 'DIFFERENT_SOCIAL_PROVIDER') {
        const registeredEmail = res.error?.data.registeredEmail;
        const registeredSocialProvider = res.error?.data.registeredSocialProvider;
        const logoutRes = await signOut({ redirect: false });

        if (logoutRes) {
          replace(
            `/users/login?error=DIFFERENT_SOCIAL_PROVIDER&registeredEmail=${registeredEmail}&registeredSocialProvider=${registeredSocialProvider}`,
          );
        }
      }

      if (errorCode !== 'DIFFERENT_SOCIAL_PROVIDER') {
        const logoutRes = await signOut({ redirect: false });
        if (logoutRes) {
          replace('/users/login');
        }
      }
    },
  });

  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  useEffect(() => {
    if (isLoginLoading === false && socialLoginUserData && socialLoginUserData.user) {
      setIsLoginLoading(true);

      const { accessToken, provider } = socialLoginUserData;
      const { email } = socialLoginUserData.user;
      mutate({ socialProvider: provider, accessToken, email: email as string });
    }
  }, [socialLoginUserData, isLoginLoading]);

  return <PageLoading />;
}
