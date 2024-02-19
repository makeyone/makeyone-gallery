'use client';

import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { editPostImages } from '@/apis/posts/actions/EditPostImages';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { EditPostImagesInput, EditPostImagesOutput } from '@/apis/posts/dtos/EditPostImages.dto';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import DragAndDropImgUpload from '@/components/DragAndDropImgUpload';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostImages.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostImages({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
  });
  const post = data?.post;

  const { push } = useRouter();

  const defaultPostImages = post?.postImages.map((postImage) => postImage.imageUrl) || [];
  const [postImages, setPostImages] = useState<string[]>(defaultPostImages);
  const { isPending, mutate } = useMutation<EditPostImagesOutput, AxiosError<EditPostImagesOutput>, EditPostImagesInput>({
    mutationFn: editPostImages,
    onSuccess: async () => {
      push(`/posts/${postId}/edit/housing`);
    },
  });
  const handleNextStep = () => {
    mutate({ postId, postImages });
  };

  return (
    <div className={cx('root')}>
      <StepCard
        cardTitle="이미지를 등록해주세요."
        cardDescription="첫번째 이미지가 대표이미지입니다. 이미지 순서는 드래그&드랍으로 변경할 수 있어요!"
      >
        <DragAndDropImgUpload defaultImages={postImages} setDefaultImages={setPostImages} />
      </StepCard>
      <PrevOrNextStep isFormValid={postImages.length > 0} onNextStep={() => handleNextStep()} isNextStepLoading={isPending} />
    </div>
  );
}
