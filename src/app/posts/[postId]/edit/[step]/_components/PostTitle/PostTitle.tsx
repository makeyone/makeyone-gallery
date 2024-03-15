'use client';

import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { editPostTitle } from '@/apis/posts/actions/EditPostTitle';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { EditPostTitleInput, EditPostTitleOutput } from '@/apis/posts/dtos/EditPostTitle.dto';
import { EditPostTitleFormInput } from '@/apis/posts/form-inputs/EditPostTitle.input';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostTitle.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostTitle({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data, refetch } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
  });
  const post = data?.post;

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
      postTitle: post?.postTitle || '',
    },
  });

  const { isPending, mutate } = useMutation<EditPostTitleOutput, AxiosError<EditPostTitleOutput>, EditPostTitleInput>({
    mutationFn: editPostTitle,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        return push(`/posts/${postId}/edit/image`);
      }
    },
  });
  const onSubmit = () => {
    const { postTitle } = getValues();
    mutate({ postId, postTitle });
  };

  return (
    <form className={cx('root')}>
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
