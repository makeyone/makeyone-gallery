'use client';

import { useRouter } from 'next/navigation';

import { ApiResponse } from '@/api/support/response/ApiResponse';

type Props = {
  error: ApiResponse<any, any>;
};

export default function RootError({ error: { error } }: Props) {
  const { push } = useRouter();

  const errorCode = error?.code;

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

  return (
    <div>
      <h2>에러가 발생하였습니다.</h2>
    </div>
  );
}
