'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';

import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Cursor } from '@/apis/common/dtos/pagination.dto';
import { getPosts } from '@/apis/posts/actions/GetPosts';
import { GetPostsOutput } from '@/apis/posts/dtos/GetPosts.dto';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostCardListSkeleton from '@/app/(main)/_components/PostCardListSkeleton';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import { bindClassNames } from '@/libs/bind-class-name';

import dateTimeAgo from '@/utils/date-time-ago';

import styles from './PostCardList.module.css';

const cx = bindClassNames(styles);

type Props = { getPostsLimit: number };

export default function PostCardList({ getPostsLimit }: Props) {
  const { isFetching, data, fetchNextPage, hasNextPage } = useInfiniteQuery<
    GetPostsOutput,
    AxiosError<GetPostsOutput>,
    InfiniteData<GetPostsOutput>,
    QueryKey,
    Cursor['afterCursor']
  >({
    queryKey: postsQueryKeys.listByCursorPagination({ limit: getPostsLimit }),
    queryFn: (fnData) => {
      return getPosts({ limit: getPostsLimit, nextCursor: (fnData?.pageParam as unknown as string | undefined) || '' });
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.cursor?.afterCursor ?? undefined;
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

  return (
    <div className={cx('root')}>
      <ul className={cx('list')}>
        {data?.pages.map((page) =>
          page.posts?.map((post) => (
            <li key={post.id} className={cx('card')}>
              <Link className={cx('link')} href="/posts/[postId]" as={`/posts/${post.id}`}>
                <div className={cx('imgBlock')}>
                  <BlurPlaceholderImage
                    className={cx('postImg')}
                    src={post.postImages[0].imageUrl}
                    alt={post.postTitle || ''}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <div className={cx('profileImgBlock')}>
                    <BlurPlaceholderImage
                      className={cx('profileImg')}
                      src={post.postedUser.profileImg as string}
                      alt={post.postedUser.nickname}
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                </div>
                <div className={cx('textBlock')}>
                  <span className={cx('postedDate')}>{dateTimeAgo(post.createdAt)}</span>
                  <h3 className={cx('postTitle')}>{post.postTitle}</h3>
                  <h4 className={cx('postedBy')}>
                    Posted by <b>{post.postedUser.nickname}</b>
                  </h4>
                </div>
              </Link>
            </li>
          )),
        )}
      </ul>
      {isFetching === true && hasNextPage === true && <PostCardListSkeleton />}
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
