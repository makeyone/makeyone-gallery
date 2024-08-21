'use client';

import { useForm } from 'react-hook-form';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { editPostContent } from '@/apis/posts/actions/EditPostContent';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { EditPostContentInput, EditPostContentOutput } from '@/apis/posts/dtos/EditPostContent.dto';
import { EditPostContentFormInput } from '@/apis/posts/form-inputs/EditPostContent.input';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostContent.module.css';

const cx = bindClassNames(styles);

const ToastUiEditor = dynamic(() => import('@/components/ToastUIEditor'), {
  ssr: false,
});

type Props = {};

export default function PostContent({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData, refetch } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const { push } = useRouter();
  const {
    getValues,
    setValue,
    handleSubmit: handleSubmitAndNextStep,
    formState: { isValid },
  } = useForm<EditPostContentFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostContentFormInput),
    defaultValues: {
      postContent: postData?.postContent || '',
    },
  });

  const { isPending, mutate } = useMutation<EditPostContentOutput, AxiosError<EditPostContentOutput>, EditPostContentInput>({
    mutationFn: editPostContent,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        return push(`/posts/${postId}/edit/setting`);
      }
    },
  });
  const onSubmit = () => {
    const { postContent } = getValues();
    mutate({
      postId,
      ...(postContent && postContent !== '<p><br></p>' && { postContent }),
    });
  };

  return (
    <div className={cx('root')}>
      <StepCard
        cardTitle="내 키보드에 대한 설명을 적어주세요."
        cardDescription="필수 사항은 아니예요! 자유롭게 적어주시면 되어요!"
      >
        <div>
          <ToastUiEditor defaultHtml={postData?.postContent || ''} setValue={setValue} registerKey="postContent" />
        </div>
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </div>
  );
}
