'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { InfiniteData, QueryKey, useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';
import { FindMyPostListViewModel } from '@/api/post/view-model/FindMyPostListViewModel';
import { ApiResponse } from '@/api/support/response/ApiResponse';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';

import PostCardListSkeleton from '@/app/[locale]/(basicLayout)/(main)/_components/PostCardListSkeleton';
import MyPostCard from '@/app/[locale]/(basicLayout)/mypage/my-posts/_components/MyPostCard/MyPostCard';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './MyPostCardList.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function MyPostCardList({}: Props) {
  const t = useClientI18n('my-post');

  const getPostsLimit = 20;
  const { isFetching, data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    ViewModelMapper<FindMyPostListViewModel>,
    ApiResponse,
    InfiniteData<{ data: FindMyPostListViewModel }>,
    QueryKey,
    string | undefined
  >({
    queryKey: postQueryKey.findMyPostList({ limit: getPostsLimit }),
    queryFn: (fnData) =>
      PostQuery.findMyPostList({ limit: getPostsLimit, nextCursor: (fnData?.pageParam as unknown as string | undefined) || '' }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.data?.cursor?.afterCursor ?? undefined;
    },
  });
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const queryClient = useQueryClient();
  const removePostFromCache = (postId: number) => {
    queryClient.setQueryData(
      postQueryKey.findMyPostList({ limit: getPostsLimit }),
      (oldData: InfiniteData<{ data: FindMyPostListViewModel }> | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              posts: page.data.posts.filter((post) => post.id !== postId),
            },
          })),
        };
      },
    );
  };

  return (
    <div className={cx('root')}>
      {data.pages[0].data.totalResults > 0 && (
        <React.Fragment>
          <ul className={cx('list')}>
            {data.pages.map((page) =>
              page.data.posts.map((post) => (
                <MyPostCard
                  key={post.id}
                  postId={post.id}
                  postedDate={post.createdDateTimeAgo}
                  postThumbnail={post.postThumbnail}
                  postTitle={post.postTitle || t('please_register_post_title')}
                  isPublished={post.isPublished}
                  removePostFromCache={removePostFromCache}
                />
              )),
            )}
          </ul>
          {isFetching === true && hasNextPage === true && <PostCardListSkeleton />}
          <div ref={ref} style={{ height: 50 }} />
        </React.Fragment>
      )}
      {data.pages[0].data.totalResults === 0 && (
        <div className={cx('emptyPostListBlock')}>
          <p className={cx('emptyPostListText')}>{t('my_post_is_empty')}</p>
        </div>
      )}
    </div>
  );
}
