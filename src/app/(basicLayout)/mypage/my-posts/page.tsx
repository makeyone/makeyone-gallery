import { Suspense } from 'react';

import { Metadata } from 'next';

import MyPostCardList from '@/app/(basicLayout)/mypage/my-posts/_components/MyPostCardList';
import MyPostCardListSkeleton from '@/app/(basicLayout)/mypage/my-posts/_components/MyPostCardListSkeleton';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '내 게시글 - 메이키원',
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
