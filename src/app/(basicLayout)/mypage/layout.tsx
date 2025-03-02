import React, { Suspense } from 'react';

import { redirect } from 'next/navigation';

import { UserQuery } from '@/api/user/User.query';

import ProfileCard from '@/app/(basicLayout)/mypage/_components/ProfileCard';
import TabMenu from '@/app/(basicLayout)/mypage/_components/TabMenu';

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
      <Suspense fallback={<React.Fragment />}>
        <ProfileCard />
      </Suspense>
      <TabMenu />
      <div className={cx('contentBlock')}>{children}</div>
    </div>
  );
}
