import React from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

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

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './page.module.css';

const cx = bindClassNames(styles);

type Props = { params: Promise<{ postId: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const postId = Number(params.postId);

  const findPostRes = await PostQuery.findPostById({ postId: Number(postId) }).catch(() => {
    notFound();
  });

  return {
    title: `${findPostRes.data.postTitle} - 메이키원 갤러리`,
  };
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const postId = Number(params.postId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
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
