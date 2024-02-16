'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';

// import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { GetPostById } from '@/apis/posts/dtos/GetPostById.dto';

// import Housing from '@/app/posts/[postId]/edit/[step]/_components/Housing';
// import PostTitleAndImages from '@/app/posts/[postId]/edit/[step]/_components/PostTitleAndImages';
import Footer from '@/app/posts/[postId]/edit/[step]/_components/Footer';
import { EditPostStep } from '@/app/posts/[postId]/edit/[step]/page';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './EditPostForm.module.css';

const cx = bindClassNames(styles);

type Props = {
  post: GetPostById;
  stepList: EditPostStep[];
  currentStep: EditPostStep;
};

export default function EditPostForm({ post, stepList, currentStep }: Props) {
  // const [postImages, setPostImages] = useState<string[]>([]);
  // const {
  //   register,
  //   watch,
  //   setValue,
  //   // getValues,
  //   // handleSubmit,
  //   // formState: { isValid, errors },
  // } = useForm<CreateOrEditPostInput>({
  //   mode: 'all',
  //   resolver: classValidatorResolver(CreateOrEditPostInput),
  // });

  return (
    <form className={cx('form')}>
      {/* <PostTitleAndImages register={register} watch={watch} postImages={postImages} setPostImages={setPostImages} />
      <Housing register={register} watch={watch} setValue={setValue} /> */}
      <Footer postId={post.id} stepList={stepList} currentStep={currentStep as EditPostStep} />
    </form>
  );
}
