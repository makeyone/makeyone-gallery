'use client';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

import { AuthMutation } from '@/api/auth/Auth.mutation';
import { GetMeViewModel } from '@/api/user/view-model/GetMeViewModel';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './HeaderLoginLogout.module.css';

const cx = bindClassNames(styles);

type Props = {
  refetchMe: () => Promise<QueryObserverResult<GetMeViewModel | null, Error>>;
  meData?: GetMeViewModel | null;
};

export default function HeaderSignInLogout({ meData, refetchMe }: Props) {
  const { replace } = useRouter();

  const { mutate: signOutMutate } = useMutation({
    mutationFn: () => AuthMutation.signOut(),
    onSuccess: async () => {
      const signOutRes = await signOut({ redirect: false });
      if (signOutRes) {
        refetchMe();
        toast.success('로그아웃이 완료되었습니다.');
        replace('/');
      }
    },
  });
  const handleSignOutBtnClick = () => {
    signOutMutate();
  };

  return (
    <div className={cx('root')}>
      {meData ? (
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
