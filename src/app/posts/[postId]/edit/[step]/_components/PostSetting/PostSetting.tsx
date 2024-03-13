'use client';

import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { editPostSetting } from '@/apis/posts/actions/EditPostSetting';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { EditPostSettingInput, EditPostSettingOutput } from '@/apis/posts/dtos/EditPostSetting.dto';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormLabel from '@/components/FormLabel';
import SliderToggle from '@/components/SliderToggle';

import { bindClassNames } from '@/libs/bind-class-name';
import { sweetAlert } from '@/libs/sweet-alert2';

import styles from './PostSetting.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostSetting({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data, refetch } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
  });
  const post = data?.post;

  const { push } = useRouter();

  const [isPublished, setIsPublished] = useState<boolean>(post?.postSetting?.isPublished || false);

  const { isPending, mutate } = useMutation<EditPostSettingOutput, AxiosError<EditPostSettingOutput>, EditPostSettingInput>({
    mutationFn: editPostSetting,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        const alert = await sweetAlert.fire({
          icon: 'success',
          titleText: '게시글 작성이 완료되었습니다!',
        });
        if (alert.isConfirmed === true) {
          return push(`/posts/${postId}`);
        }
      }
    },
  });
  const handleNextStep = () => {
    mutate({ postId, isPublished });
  };

  return (
    <div className={cx('root')}>
      <StepCard cardTitle="마지막 단계입니다!" cardDescription="게시글에 대한 설정을 해주세요!">
        <div className={cx('settingItem')}>
          <FormLabel label="내 게시글 공개하기" />
          <SliderToggle isChecked={isPublished} onChange={(isChecked: boolean) => setIsPublished(isChecked)} />
          <p className={cx('settingDescription')}>게시글 공개를 하지 않으면 해당 게시글은 나만 볼 수 있습니다.</p>
        </div>
      </StepCard>
      <PrevOrNextStep
        isFormValid
        onNextStep={() => handleNextStep()}
        isNextStepLoading={isPending}
        buttonText="게시글 작성 완료하기"
      />
    </div>
  );
}
