'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react';

import mutateCustomErrorAlert from '@/apis/common/mutate-custom-error-alert';
import { login } from '@/apis/users/actions/Login';
import { LoginError, LoginInput, LoginOutput } from '@/apis/users/dtos/Login.dto';

import PageLoading from '@/components/Loading/PageLoading';

import { setClientCookie } from '@/cookies/client-cookies';

export default function Login() {
  const { replace } = useRouter();

  const { data: socialLoginUserData } = useSession();
  const { mutate } = useMutation<LoginOutput, AxiosError<LoginOutput>, LoginInput>({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.accessToken && res.refreshToken) {
        setClientCookie('refreshToken', res.refreshToken);
        setClientCookie('accessToken', res.accessToken);
      }
      replace('/');
    },
    onError: async (error) => {
      const customError = error.response?.data.error;

      if (customError?.message === 'DIFFERENT_SOCIAL_PROVIDER') {
        const registeredEmail = customError.data?.registeredEmail;
        const registeredSocialProvider = customError.data?.registeredSocialProvider;
        const logoutRes = await signOut({ redirect: false });

        if (logoutRes) {
          replace(
            `/users/login?error=DIFFERENT_SOCIAL_PROVIDER&registeredEmail=${registeredEmail}&registeredSocialProvider=${registeredSocialProvider}`,
          );
        }
      }

      if (customError?.message !== 'DIFFERENT_SOCIAL_PROVIDER') {
        await mutateCustomErrorAlert({
          errorOutput: LoginError,
          errorMessage: error.response?.data.error?.message,
        });
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
