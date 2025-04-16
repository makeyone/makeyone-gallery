'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PrevOrNextStep from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { useRouter } from '@/i18n/routing';

import styles from './PostTitle.module.css';

const cx = bindClassNames(styles);

class EditPostTitleFormInput {
  @IsNotEmpty({ message: 'edit_post_input_title_is_required' })
  @IsString()
  @MaxLength(200, { message: 'edit_post_input_title_max_length_is_200' })
  postTitle!: string;
}

type Props = {};

export default function PostTitle({}: Props) {
  const t = useClientI18n('edit-post');

  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useSuspenseQuery({
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
    onSuccess: () => push(`/posts/${postId}/edit/image`),
  });
  const onSubmit = () => {
    const { postTitle } = getValues();
    mutate({ postId, postTitle });
  };

  return (
    <form className={cx('root')} onSubmit={(evt) => evt.preventDefault()}>
      <StepCard cardTitle={t('edit_post_title_card_title')}>
        <FormFloatingLabelInput
          label={t('edit_post_input_title_label')}
          inputId="postTitle"
          inputType="text"
          maxLength={200}
          inputRegisterReturn={register('postTitle')}
          currentInputValue={watch().postTitle}
          errorMessage={errors.postTitle?.message && t(errors.postTitle.message)}
        />
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </form>
  );
}
