'use client';

import { useForm } from 'react-hook-form';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IsOptional, IsString } from 'class-validator';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostContent.module.css';

const cx = bindClassNames(styles);

const ToastUiEditor = dynamic(() => import('@/components/ToastUIEditor'), {
  ssr: false,
});

class EditPostContentFormInput {
  @IsOptional()
  @IsString()
  postContent?: string;
}

type Props = {};

export default function PostContent({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData, refetch } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
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

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostContent,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/setting`);
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
