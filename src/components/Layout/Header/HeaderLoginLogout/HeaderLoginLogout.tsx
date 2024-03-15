'use client';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';

import { getMe } from '@/apis/users/actions/GetMe';
import { logout } from '@/apis/users/actions/Logout';
import { LogoutOutput } from '@/apis/users/dtos/Logout.dto';
import { usersQueryKeys } from '@/apis/users/users.query-keys';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './HeaderLoginLogout.module.css';
import { removeClientCookie } from '@/cookies/client-cookies';

const cx = bindClassNames(styles);

type Props = {};

export default function HeaderLoginLogout({}: Props) {
  const { push } = useRouter();

  const { data, refetch } = useQuery({
    queryKey: usersQueryKeys.me(),
    queryFn: () => getMe(),
  });

  const { mutate: logoutMutate } = useMutation<LogoutOutput, AxiosError<LogoutOutput>>({
    mutationFn: logout,
    onSuccess: async () => {
      removeClientCookie('refreshToken');
      removeClientCookie('accessToken');
      const logoutRes = await signOut({ redirect: false });
      if (logoutRes) {
        refetch();
        toast.success('로그아웃이 완료되었습니다.');
        push('/');
      }
    },
  });
  const handleLogoutBtnClick = () => {
    logoutMutate();
  };

  return (
    <div className={cx('root')}>
      {data?.me ? (
        <button type="button" onClick={handleLogoutBtnClick} className={cx('loginAndLogout')}>
          로그아웃
        </button>
      ) : (
        <Link href="/users/login" className={cx('loginAndLogout')}>
          로그인
        </Link>
      )}
    </div>
  );
}
