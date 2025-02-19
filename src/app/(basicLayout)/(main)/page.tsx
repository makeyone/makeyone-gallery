import { Metadata } from 'next';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostCardList from '@/app/(basicLayout)/(main)/_components/PostCardList';
import TabMenu from '@/app/(basicLayout)/(main)/_components/TabMenu';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '메이키원 갤러리',
  };
}

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
    <div>
      <TabMenu />
      <HydrationBoundary state={dehydratedState}>
        <PostCardList getPostsLimit={getPostsLimit} />
      </HydrationBoundary>
    </div>
  );
}
