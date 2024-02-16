'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { CreateOrEditPostInput } from '@/apis/posts/form-inputs/EditPost.input';

import Housing from '@/app/posts/[postId]/edit/[step]/_components/Housing';
import PostTitleAndImages from '@/app/posts/[postId]/edit/[step]/_components/PostTitleAndImages';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './CreatePostForm.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function CreatePostForm({}: Props) {
  const [postImages, setPostImages] = useState<string[]>([]);
  const {
    register,
    watch,
    setValue,
    // getValues,
    // handleSubmit,
    // formState: { isValid, errors },
  } = useForm<CreateOrEditPostInput>({
    mode: 'all',
    resolver: classValidatorResolver(CreateOrEditPostInput),
  });

  return (
    <form className={cx('form')}>
      <PostTitleAndImages register={register} watch={watch} postImages={postImages} setPostImages={setPostImages} />
      <Housing register={register} watch={watch} setValue={setValue} />
    </form>
  );
}
