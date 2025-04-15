'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';
import { FindPostListViewModel } from '@/api/post/view-model/FindPostListViewModel';
import { ApiResponse } from '@/api/support/response/ApiResponse';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';

import PostCardListSkeleton from '@/app/[locale]/(basicLayout)/(main)/_components/PostCardListSkeleton';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { Link } from '@/i18n/routing';

import styles from './PostCardList.module.css';

const cx = bindClassNames(styles);

type Props = { getPostsLimit: number };

export default function PostCardList({ getPostsLimit }: Props) {
  const t = useClientI18n('main');

  const { isFetching, data, fetchNextPage, hasNextPage } = useInfiniteQuery<
    ViewModelMapper<FindPostListViewModel>,
    ApiResponse,
    InfiniteData<{ data: FindPostListViewModel }>,
    QueryKey,
    string | undefined
  >({
    queryKey: postQueryKey.findPostList({ limit: getPostsLimit }),
    queryFn: (fnData) =>
      PostQuery.findPostList({ limit: getPostsLimit, nextCursor: (fnData?.pageParam as unknown as string | undefined) || '' }),
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

  return (
    <div className={cx('root')}>
      <ul className={cx('list')}>
        {data?.pages.map((page) =>
          page?.data.posts.map((post) => (
            <li key={post.id} className={cx('card')}>
              <Link className={cx('link')} href="/posts/[postId]" as={`/posts/${post.id}`}>
                <div className={cx('imgBlock')}>
                  <BlurPlaceholderImage
                    className={cx('postImg')}
                    src={post.postThumbnail}
                    alt={post.postTitle}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <div className={cx('profileImgBlock')}>
                    <BlurPlaceholderImage
                      className={cx('profileImg')}
                      src={post.postedUser?.profileImg || '/images/users/blank_user.png'}
                      alt={post.postedUser?.nickname || t('withdrawn_user')}
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                </div>
                <div className={cx('textBlock')}>
                  <span className={cx('postedDate')}>{t('posted_date', { timeAgo: post.createdDateTimeAgo })}</span>
                  <h3 className={cx('postTitle')}>{post.postTitle}</h3>
                  <h4 className={cx('postedBy')}>
                    {post.postedUser && (
                      <React.Fragment>
                        {t.rich('posted_user', { nickname: post.postedUser.nickname, b: (text) => <b>{text}</b> })}
                      </React.Fragment>
                    )}
                    {post.postedUser === null && <React.Fragment>{t('withdrawn_user')}</React.Fragment>}
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
