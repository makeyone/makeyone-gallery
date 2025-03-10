'use client';

import '@/styles/error.css';

import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

import { AuthMutation } from '@/api/auth/Auth.mutation';
import { ApiResponse } from '@/api/support/response/ApiResponse';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

type Props = {
  error: ApiResponse<any, any>;
  reset: () => void;
};

export default function RootError({ error: { error }, reset }: Props) {
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
      <h1 className="title">죄송합니다, 알 수 없는 오류가 발생했습니다.</h1>
      <p className="content">
        데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </p>
      <Image className="image" src="/images/error/unknown.webp" alt="unknown" title="unknown" width={320} height={240} />
      <button type="button" className="retryBtn" onClick={reset}>
        다시 불러오기
      </button>
    </div>
  );
}
