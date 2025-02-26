import React from 'react';

import { redirect } from 'next/navigation';

import { UserQuery } from '@/api/user/User.query';

import Notice from '@/app/(basicLayout)/mypage/_components/Notice';
import Sidebar from '@/app/(basicLayout)/mypage/_components/Sidebar';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './layout.module.css';

const cx = bindClassNames(styles);

type Props = {
  children: React.ReactNode;
};

export default async function MyPageLayout({ children }: Props) {
  const findMeRes = await UserQuery.getMe();
  if (findMeRes.data === null) {
    redirect('/users/login');
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
