import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostCardList from '@/app/[locale]/(basicLayout)/(main)/_components/PostCardList';
import TabMenu from '@/app/[locale]/(basicLayout)/(main)/_components/TabMenu';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export default async function MainPage() {
  const getPostsLimit = 20;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: postQueryKey.findPostList({ limit: getPostsLimit }),
    queryFn: () => PostQuery.findPostList({ limit: getPostsLimit }),
    initialPageParam: undefined,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={cx('root')}>
      <TabMenu />
      <div className={cx('postListBlock')}>
        <HydrationBoundary state={dehydratedState}>
          <PostCardList getPostsLimit={getPostsLimit} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
