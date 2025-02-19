'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { UserQuery, userQueryKey } from '@/api/user/User.query';

import Notice from '@/app/(basicLayout)/mypage/_components/Notice';
import Sidebar from '@/app/(basicLayout)/mypage/_components/Sidebar';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './layout.module.css';

const cx = bindClassNames(styles);

type Props = {
  children: React.ReactNode;
};

export default function MyPageLayout({ children }: Props) {
  const { isPending, data: meData } = useQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });

  const { replace } = useRouter();
  useEffect(() => {
    if (meData === null) {
      replace('/users/login');
    }
  }, [meData]);

  if (isPending || !meData) {
    return <></>;
  }

  return (
    <div className={cx('root')}>
      <Notice />
      <div className={cx('contentDiv')}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
