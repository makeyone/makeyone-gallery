import React from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';
import { UserQuery } from '@/api/user/User.query';

import { FRONT_SERVER_URL } from '@/constants/environment';

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

  const isPublished = findPostRes.data.isPublished;
  const postTitle = findPostRes.data.postTitle;
  const postKeycapNames = findPostRes.data.postKeycaps.map((keycap) => keycap.keycapName).join(', ');
  const postSwitchNames = findPostRes.data.postSwitches.map((switchItem) => switchItem.switchName).join(', ');
  const postStabilizerNames = findPostRes.data.postStabilizers.map((stabilizer) => stabilizer.stabilizerName).join(', ');
  const postThumbnail = findPostRes.data.postImages[0]?.imageUrl || '/images/posts/blank_thumbnail.png';

  if (postTitle === null || isPublished === false) {
    return {
      title: '메이키원',
      robots: 'noindex, nofollow',
    };
  }

  const description = `${postTitle}, ${postKeycapNames}, ${postSwitchNames}, ${postStabilizerNames}`;

  return {
    title: `${postTitle} - 메이키원`,
    description: description,
    keywords: [
      ...postTitle.split(' '),
      postTitle,
      '커스텀 키보드',
      '기계식 키보드',
      '키보드',
      '키캡',
      '키보드 스위치',
      '메이키원',
    ],
    robots: 'all, index, follow',
    openGraph: {
      title: `${postTitle} - 메이키원`,
      description: description,
      url: `${FRONT_SERVER_URL}/posts/${postId}`,
      siteName: 'MakeyOne',
      images: [
        {
          url: postThumbnail,
          alt: postTitle,
        },
      ],
      type: 'website',
    },
  };
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const postId = Number(params.postId);

  const findPostRes = await PostQuery.findPostById({ postId: Number(postId) }).catch(() => {
    notFound();
  });
  const findMeRes = await UserQuery.getMe();

  const myUserId = findMeRes.data?.id;
  const myUserRole = findMeRes.data?.role;
  const postedUserId = findPostRes.data.postedUser?.id;
  const isPublished = findPostRes.data.isPublished;

  if (isPublished === false && postedUserId !== myUserId && myUserRole !== 'ADMIN') {
    notFound();
  }

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
