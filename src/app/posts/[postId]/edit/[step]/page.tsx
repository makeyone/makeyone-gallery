import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';
import { UserQuery } from '@/api/user/User.query';

import PageSubject from '@/app/posts/[postId]/edit/[step]/_components/PageSubject';
import PostContent from '@/app/posts/[postId]/edit/[step]/_components/PostContent';
import PostFoam from '@/app/posts/[postId]/edit/[step]/_components/PostFoam';
import PostHousing from '@/app/posts/[postId]/edit/[step]/_components/PostHousing';
import PostImages from '@/app/posts/[postId]/edit/[step]/_components/PostImages';
import PostKeyboardDefinition from '@/app/posts/[postId]/edit/[step]/_components/PostKeyboardDefinition';
import PostKeycap from '@/app/posts/[postId]/edit/[step]/_components/PostKeycap';
import PostKeycapOnLayout from '@/app/posts/[postId]/edit/[step]/_components/PostKeycapOnLayout';
import PostPlate from '@/app/posts/[postId]/edit/[step]/_components/PostPlate';
import PostPrintedCircuitBoard from '@/app/posts/[postId]/edit/[step]/_components/PostPrintedCircuitBoard';
import PostSetting from '@/app/posts/[postId]/edit/[step]/_components/PostSetting';
import PostStabilizer from '@/app/posts/[postId]/edit/[step]/_components/PostStabilizer';
import PostSwitch from '@/app/posts/[postId]/edit/[step]/_components/PostSwitch';
import PostSwitchOnLayout from '@/app/posts/[postId]/edit/[step]/_components/PostSwitchOnLayout';
import PostTitle from '@/app/posts/[postId]/edit/[step]/_components/PostTitle';
import PostVideo from '@/app/posts/[postId]/edit/[step]/_components/PostVideo';
import { EditPostStep, stepList } from '@/app/posts/[postId]/edit/[step]/_constants/step';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './page.module.css';

const cx = bindClassNames(styles);

type Props = {
  params: Promise<{
    postId: string;
    step: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const postId = Number(params.postId);

  const findPostRes = await PostQuery.findPostById({ postId: Number(postId) }).catch(() => {
    notFound();
  });
  const postTitle = findPostRes.data.postTitle;

  return {
    title: `${postTitle ? `${postTitle} 포스트 수정 - 메이키원` : '포스트 작성 - 메이키원'}`,
    robots: 'noindex, nofollow',
  };
}

export default async function EditPostPage(props: Props) {
  const params = await props.params;
  const postId = Number(params.postId);
  const currentStep = params.step;

  if (stepList.some((step) => step === currentStep) === false) {
    notFound();
  }
  const assignTypeToCurrentStep = currentStep as EditPostStep;

  const findPostRes = await PostQuery.findPostById({ postId: Number(postId) }).catch(() => {
    notFound();
  });

  const findMeRes = await UserQuery.getMe();
  if (findMeRes.data === null || findPostRes.data.postedUser?.id !== findMeRes.data.id) {
    redirect('/');
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={cx('root')}>
      <PageSubject />
      <HydrationBoundary state={dehydratedState}>
        <div className={cx('stepBlock')}>
          {assignTypeToCurrentStep === 'title' && <PostTitle />}
          {assignTypeToCurrentStep === 'image' && <PostImages />}
          {assignTypeToCurrentStep === 'housing' && <PostHousing />}
          {assignTypeToCurrentStep === 'switch' && <PostSwitch />}
          {assignTypeToCurrentStep === 'keycap' && <PostKeycap />}
          {assignTypeToCurrentStep === 'stabilizer' && <PostStabilizer />}
          {assignTypeToCurrentStep === 'keyboard-definition' && <PostKeyboardDefinition />}
          {assignTypeToCurrentStep === 'switch-on-layout' && <PostSwitchOnLayout />}
          {assignTypeToCurrentStep === 'keycap-on-layout' && <PostKeycapOnLayout />}
          {assignTypeToCurrentStep === 'pcb' && <PostPrintedCircuitBoard />}
          {assignTypeToCurrentStep === 'plate' && <PostPlate />}
          {assignTypeToCurrentStep === 'foam' && <PostFoam />}
          {assignTypeToCurrentStep === 'video' && <PostVideo />}
          {assignTypeToCurrentStep === 'content' && <PostContent />}
          {assignTypeToCurrentStep === 'setting' && <PostSetting />}
        </div>
      </HydrationBoundary>
    </div>
  );
}
