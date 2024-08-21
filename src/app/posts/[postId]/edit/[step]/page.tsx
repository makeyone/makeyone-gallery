import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';
import { getMe } from '@/apis/users/actions/GetMe';

import PageSubject from '@/app/posts/[postId]/edit/[step]/_components/PageSubject';
import PostContent from '@/app/posts/[postId]/edit/[step]/_components/PostContent';
import PostFoam from '@/app/posts/[postId]/edit/[step]/_components/PostFoam';
import PostHousing from '@/app/posts/[postId]/edit/[step]/_components/PostHousing';
import PostImages from '@/app/posts/[postId]/edit/[step]/_components/PostImages';
import PostKeyboardDefinition from '@/app/posts/[postId]/edit/[step]/_components/PostKeyboardDefinition';
import PostKeycap from '@/app/posts/[postId]/edit/[step]/_components/PostKeycap';
import PostKeycapOnLayout from '@/app/posts/[postId]/edit/[step]/_components/PostKeycapOnLayout';
import PostPlate from '@/app/posts/[postId]/edit/[step]/_components/PostPlate';
import PostPrintedCircuit from '@/app/posts/[postId]/edit/[step]/_components/PostPrintedCircuit';
import PostSetting from '@/app/posts/[postId]/edit/[step]/_components/PostSetting';
import PostStabilizer from '@/app/posts/[postId]/edit/[step]/_components/PostStabilizer';
import PostSwitch from '@/app/posts/[postId]/edit/[step]/_components/PostSwitch';
import PostSwitchOnLayout from '@/app/posts/[postId]/edit/[step]/_components/PostSwitchOnLayout';
import PostTitle from '@/app/posts/[postId]/edit/[step]/_components/PostTitle';
import PostVideo from '@/app/posts/[postId]/edit/[step]/_components/PostVideo';
import { EditPostStep, stepList } from '@/app/posts/[postId]/edit/[step]/_constants/step';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '글 작성 - 메이키원 갤러리',
  };
}

async function getPostData(postId: number) {
  try {
    const res = await getPostById({ postId });
    return res.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.error?.code;
    if (errorCode === 'P100') {
      return redirect('/not-found');
    }

    return redirect('/server-error');
  }
}

async function getMeData() {
  const res = await getMe();
  return res.data;
}

type Props = {
  params: {
    postId: string;
    step: string;
  };
};

export default async function EditPostPage({ params: { postId, step: currentStep } }: Props) {
  if (stepList.some((step) => step === currentStep) === false) {
    redirect('/not-found');
  }
  const assignTypeToCurrentStep = currentStep as EditPostStep;

  const post = await getPostData(parseInt(postId, 10));
  const me = await getMeData();
  if (!me || post?.postedUser.id !== me?.id) {
    redirect('/');
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: postsQueryKeys.byId(post.id), queryFn: () => getPostById({ postId: post.id }) });
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
          {assignTypeToCurrentStep === 'pcb' && <PostPrintedCircuit />}
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
