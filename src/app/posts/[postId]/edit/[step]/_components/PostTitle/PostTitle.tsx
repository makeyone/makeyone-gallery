'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostTitle.module.css';

const cx = bindClassNames(styles);

class EditPostTitleFormInput {
  @IsNotEmpty({ message: '게시글의 제목을 입력해주세요.' })
  @IsString()
  @MaxLength(200, { message: '게시글 제목은 200자 이하로 입력이 가능합니다.' })
  postTitle!: string;
}

type Props = {};

export default function PostTitle({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData, refetch } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const { push } = useRouter();
  const {
    register,
    watch,
    getValues,
    handleSubmit: handleSubmitAndNextStep,
    formState: { isValid, errors },
  } = useForm<EditPostTitleFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostTitleFormInput),
    defaultValues: {
      postTitle: postData?.postTitle || '',
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostTitle,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/image`);
      }
    },
  });
  const onSubmit = () => {
    const { postTitle } = getValues();
    mutate({ postId, postTitle });
  };

  return (
    <form className={cx('root')} onSubmit={(evt) => evt.preventDefault()}>
      <StepCard cardTitle="게시글의 제목을 입력해주세요.">
        <FormFloatingLabelInput
          label="글 제목"
          inputId="postTitle"
          inputType="text"
          maxLength={200}
          inputRegisterReturn={register('postTitle')}
          currentInputValue={watch().postTitle}
          errorMessage={errors.postTitle?.message}
        />
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </form>
  );
}
