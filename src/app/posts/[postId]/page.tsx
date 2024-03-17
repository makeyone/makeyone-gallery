import React from 'react';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { GetPostByIdError, GetPostByIdOutput } from '@/apis/posts/dtos/GetPostById.dto';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostImage from '@/app/posts/[postId]/_components/PostImage';
import PostStep from '@/app/posts/[postId]/_components/PostStep';
import PostTitle from '@/app/posts/[postId]/_components/PostTitle';
import PostVideo from '@/app/posts/[postId]/_components/PostVideo';
import PostWriter from '@/app/posts/[postId]/_components/PostWriter';

import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

import { bindClassNames } from '@/libs/bind-class-name';
import getAxiosErrorMessage from '@/libs/get-axios-error-message';

import styles from './page.module.css';

const cx = bindClassNames(styles);

type Props = {
  params: {
    postId: string;
  };
};

async function getPostData(postId: number) {
  try {
    const res = await getPostById({ postId });
    return res.post;
  } catch (err: any) {
    const errorMessage = getAxiosErrorMessage<GetPostByIdOutput, typeof GetPostByIdError>(err);
    if (errorMessage === 'POST_NOT_FOUND') {
      return redirect('/not-found');
    }
    throw new Error('SERVER_ERROR');
  }
}

export async function generateMetadata({ params: { postId } }: Props): Promise<Metadata> {
  const post = await getPostData(parseInt(postId, 10));

  return {
    title: `${post?.postTitle} - 메이키원 갤러리`,
  };
}

export default async function PostPage({ params: { postId } }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: postsQueryKeys.byId(parseInt(postId as string, 10)),
    queryFn: () => getPostById({ postId: parseInt(postId as string, 10) }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <Header />
      <main className="main">
        <HydrationBoundary state={dehydratedState}>
          <div className={cx('root')}>
            <PostImage />
            <div className={cx('mainBlock')}>
              <div className={cx('leftBlock')}>
                <PostTitle />
                <PostVideo />
              </div>
              <div className={cx('rightBlock')}>
                <PostWriter />
                <PostStep />
              </div>
            </div>
          </div>
        </HydrationBoundary>
      </main>
      <Footer />
    </>
  );
}
