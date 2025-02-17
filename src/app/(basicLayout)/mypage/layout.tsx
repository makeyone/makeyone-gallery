'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getMe } from '@/apis/users/actions/GetMe';
import { usersQueryKeys } from '@/apis/users/users.query-keys';

import Notice from '@/app/(basicLayout)/mypage/_components/Notice';
import Sidebar from '@/app/(basicLayout)/mypage/_components/Sidebar';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './layout.module.css';

const cx = bindClassNames(styles);

type Props = {
  children: React.ReactNode;
};

export default function MyPageLayout({ children }: Props) {
  const { isPending, data: meData } = useQuery({
    queryKey: usersQueryKeys.me(),
    queryFn: () => getMe(),
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
