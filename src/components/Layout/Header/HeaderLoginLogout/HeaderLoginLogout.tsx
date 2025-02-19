'use client';

import { toast } from 'react-toastify';

import Link from 'next/link';

import { useMutation, useQuery } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

import { AuthMutation } from '@/api/auth/Auth.mutation';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './HeaderLoginLogout.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function HeaderSignInLogout({}: Props) {
  const { data, refetch } = useQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });

  const { mutate: signOutMutate } = useMutation({
    mutationFn: () => AuthMutation.signOut(),
    onSuccess: async () => {
      const signOutRes = await signOut({ redirect: false });
      if (signOutRes) {
        refetch();
        toast.success('로그아웃이 완료되었습니다.');
      }
    },
  });
  const handleSignOutBtnClick = () => {
    signOutMutate();
  };

  return (
    <div className={cx('root')}>
      {data ? (
        <button type="button" onClick={handleSignOutBtnClick} className={cx('signInAndSignOut')}>
          로그아웃
        </button>
      ) : (
        <Link href="/users/login" className={cx('signInAndSignOut')}>
          로그인
        </Link>
      )}
    </div>
  );
}
