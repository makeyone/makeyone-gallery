import React, { Suspense } from 'react';

import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { PostQuery } from '@/api/post/Post.query';
import { UserQuery } from '@/api/user/User.query';

import PageSubject from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PageSubject';
import PostContent from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostContent';
import PostFoam from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostFoam';
import PostHousing from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostHousing';
import PostImages from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostImages';
import PostKeyboardDefinition from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostKeyboardDefinition';
import PostKeycap from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostKeycap';
import PostKeycapOnLayout from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostKeycapOnLayout';
import PostPlate from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostPlate';
import PostPrintedCircuitBoard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostPrintedCircuitBoard';
import PostSetting from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostSetting';
import PostStabilizer from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostStabilizer';
import PostSwitch from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostSwitch';
import PostSwitchOnLayout from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostSwitchOnLayout';
import PostTitle from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostTitle';
import PostVideo from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostVideo';
import { EditPostStep, stepList } from '@/app/[locale]/posts/[postId]/edit/[step]/_constants/step';

import useServerI18n from '@/hooks/useServerI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './page.module.css';

const cx = bindClassNames(styles);

type Props = {
  params: Promise<{
    postId: string;
    step: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const t = await useServerI18n('edit-post');

  const params = await props.params;
  const postId = Number(params.postId);

  const findPostRes = await PostQuery.findPostById({ postId: Number(postId) }).catch(() => {
    notFound();
  });
  const postTitle = findPostRes.data.postTitle;

  return {
    title: `${postTitle ? t('meta_title_edit_post', { postTitle }) : t('meta_title_create_post')}`,
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

  return (
    <div className={cx('root')}>
      <PageSubject />
      <Suspense fallback={<React.Fragment />}>
        <div className={cx('stepBlock')}>
          {assignTypeToCurrentStep === 'title' && <PostTitle />}
          {assignTypeToCurrentStep === 'image' && <PostImages />}
          {assignTypeToCurrentStep === 'housing' && <PostHousing />}
          {assignTypeToCurrentStep === 'pcb' && <PostPrintedCircuitBoard />}
          {assignTypeToCurrentStep === 'plate' && <PostPlate />}
          {assignTypeToCurrentStep === 'foam' && <PostFoam />}
          {assignTypeToCurrentStep === 'switch' && <PostSwitch />}
          {assignTypeToCurrentStep === 'keycap' && <PostKeycap />}
          {assignTypeToCurrentStep === 'stabilizer' && <PostStabilizer />}
          {assignTypeToCurrentStep === 'keyboard-definition' && <PostKeyboardDefinition />}
          {assignTypeToCurrentStep === 'switch-on-layout' && <PostSwitchOnLayout />}
          {assignTypeToCurrentStep === 'keycap-on-layout' && <PostKeycapOnLayout />}
          {assignTypeToCurrentStep === 'video' && <PostVideo />}
          {assignTypeToCurrentStep === 'content' && <PostContent />}
          {assignTypeToCurrentStep === 'setting' && <PostSetting />}
        </div>
      </Suspense>
    </div>
  );
}
