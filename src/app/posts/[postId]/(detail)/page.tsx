import React from 'react';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostContent from '@/app/posts/[postId]/(detail)/_components/PostContent';
import PostFoam from '@/app/posts/[postId]/(detail)/_components/PostFoam';
import PostImage from '@/app/posts/[postId]/(detail)/_components/PostImage';
import PostKeyboardLayout from '@/app/posts/[postId]/(detail)/_components/PostKeyboardLayout';
import PostKeycap from '@/app/posts/[postId]/(detail)/_components/PostKeycap';
import PostPlate from '@/app/posts/[postId]/(detail)/_components/PostPlate';
import PostPrintedCircuitBoard from '@/app/posts/[postId]/(detail)/_components/PostPrintedCircuitBoard';
import PostStabilizer from '@/app/posts/[postId]/(detail)/_components/PostStabilizer';
import PostStep from '@/app/posts/[postId]/(detail)/_components/PostStep';
import PostSwitch from '@/app/posts/[postId]/(detail)/_components/PostSwitch';
import PostTitle from '@/app/posts/[postId]/(detail)/_components/PostTitle';
import PostVideo from '@/app/posts/[postId]/(detail)/_components/PostVideo';
import PostWriter from '@/app/posts/[postId]/(detail)/_components/PostWriter';

import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

import { bindClassNames } from '@/libs/bind-class-name';

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
    return res.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.error?.code;
    if (errorCode === 'POST_NOT_FOUND') {
      return redirect('/not-found');
    }

    return redirect('/server-error');
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
                <PostKeyboardLayout />
                <PostPrintedCircuitBoard />
                <PostPlate />
                <PostFoam />
                <PostSwitch />
                <PostKeycap />
                <PostStabilizer />
                <PostContent />
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
