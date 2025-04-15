'use client';

import '@/styles/error.css';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

import { AuthMutation } from '@/api/auth/Auth.mutation';
import { ApiResponse } from '@/api/support/response/ApiResponse';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

import useClientI18n from '@/hooks/useClientI18n';

import { useRouter } from '@/i18n/routing';

type Props = {
  error: ApiResponse<any, any>;
  reset: () => void;
};

export default function RootError({ error: { error }, reset }: Props) {
  const t = useClientI18n('unknown-error');

  const { replace } = useRouter();

  const { refetch: refetchMe } = useQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });
  const { mutate: signOutMutate } = useMutation({
    mutationFn: () => AuthMutation.signOut(),
    onSuccess: async () => {
      const signOutRes = await signOut({ redirect: false });
      if (signOutRes) {
        refetchMe();
        replace('/users/login');
      }
    },
  });

  const errorCode = error?.code;

  switch (errorCode) {
    case 'NOT_LOGGED_IN':
      replace('/users/login');
      break;
    case 'NON_EXISTENT_USER':
      signOutMutate();
      break;
    case 'NOT_ACTIVED_USER':
      signOutMutate();
      break;
    case 'INVALID_JWT_ACCESS_TOKEN':
      signOutMutate();
      break;
    case 'DO_NOT_HAVE_PERMISSION':
      notFound();
    default:
      break;
  }

  return (
    <div className="root">
      <h1 className="title">{t('unknown_error_title')}</h1>
      <p className="content">{t('unknown_error_description')}</p>
      <Image className="image" src="/images/error/unknown.webp" alt="unknown" title="unknown" width={320} height={240} />
      <button type="button" className="retryBtn" onClick={reset}>
        {t('unknown_error_retry_btn')}
      </button>
    </div>
  );
}
