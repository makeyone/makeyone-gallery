'use client';

import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import { CreateOrEditPostInput } from '@/apis/posts/form-inputs/CreateOrEditPost.input';

import FormCard from '@/app/posts/(create-or-edit)/_components/FormCard';

import DragAndDropImgUpload from '@/components/DragAndDropImgUpload';
import FormFloatingLabelInput from '@/components/FormFloatingLabelInput';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostTitleAndImages.module.css';

const cx = bindClassNames(styles);

type Props = {
  register: UseFormRegister<CreateOrEditPostInput>;
  watch: UseFormWatch<CreateOrEditPostInput>;
  postImages: string[];
  setPostImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function PostTitleAndImages({ register, watch, postImages, setPostImages }: Props) {
  return (
    <div className={cx('root')}>
      <FormCard cardTitle="글 제목과 이미지 등록" cardDescription="게시글의 제목과 이미지를 등록해주세요!">
        <FormFloatingLabelInput
          label="글 제목"
          inputId="postTitle"
          inputType="text"
          inputRegisterReturn={register('postTitle')}
          currentInputValue={watch().postTitle}
        />
        <DragAndDropImgUpload defaultImages={postImages} setDefaultImages={setPostImages} />
      </FormCard>
    </div>
  );
}
