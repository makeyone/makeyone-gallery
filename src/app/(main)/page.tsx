import { Metadata } from 'next';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getPosts } from '@/apis/posts/actions/GetPosts';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostCardList from '@/app/(main)/_components/PostCardList';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '메이키원 갤러리',
  };
}

export default async function MainPage() {
  const getPostsLimit = 20;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: postsQueryKeys.listByCursorPagination({ limit: getPostsLimit }),
    queryFn: () => getPosts({ limit: getPostsLimit }),
    initialPageParam: undefined,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={cx('root')}>
      <HydrationBoundary state={dehydratedState}>
        <PostCardList getPostsLimit={getPostsLimit} />
      </HydrationBoundary>
    </div>
  );
}
