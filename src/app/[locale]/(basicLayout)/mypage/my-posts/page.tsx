import { Suspense } from 'react';

import { Metadata } from 'next';

import MyPostCardList from '@/app/[locale]/(basicLayout)/mypage/my-posts/_components/MyPostCardList';
import MyPostCardListSkeleton from '@/app/[locale]/(basicLayout)/mypage/my-posts/_components/MyPostCardListSkeleton';

import useServerI18n from '@/hooks/useServerI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  const t = await useServerI18n('my-post');

  return {
    title: t('meta_title'),
  };
}

export default async function MyPostsPage() {
  return (
    <div className={cx('root')}>
      <Suspense fallback={<MyPostCardListSkeleton />}>
        <MyPostCardList />
      </Suspense>
    </div>
  );
}
