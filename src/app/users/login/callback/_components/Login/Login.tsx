'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react';

import mutateCustomErrorAlert from '@/apis/common/mutate-custom-error-alert';
import { login } from '@/apis/users/actions/Login';
import { LoginInput, LoginOutput } from '@/apis/users/dtos/Login.dto';

import PageLoading from '@/components/Loading/PageLoading';

export default function Login() {
  const { replace } = useRouter();

  const { data: socialLoginUserData } = useSession();
  const { mutate } = useMutation<LoginOutput, AxiosError<LoginOutput>, LoginInput>({
    mutationFn: login,
    onSuccess: () => {
      replace('/');
    },
    onError: async (error) => {
      const errorData = error.response?.data.error?.data;
      const errorCode = error.response?.data.error?.code;

      if (errorCode === 'AU005') {
        const registeredEmail = errorData?.registeredEmail;
        const registeredSocialProvider = errorData?.registeredSocialProvider;
        const logoutRes = await signOut({ redirect: false });

        if (logoutRes) {
          replace(
            `/users/login?error=DIFFERENT_SOCIAL_PROVIDER&registeredEmail=${registeredEmail}&registeredSocialProvider=${registeredSocialProvider}`,
          );
        }
      }

      if (errorCode !== 'AU005') {
        await mutateCustomErrorAlert<LoginOutput>(error);
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
