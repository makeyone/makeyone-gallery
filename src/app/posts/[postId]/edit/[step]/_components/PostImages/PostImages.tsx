'use client';

import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import DragAndDropImgUpload from '@/components/DragAndDropImg/DragAndDropImgUpload';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostImages.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostImages({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData, refetch } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const { push } = useRouter();

  const defaultPostImages = postData!.postImages.map((postImage) => postImage.imageUrl) || [];
  const [postImages, setPostImages] = useState<string[]>(defaultPostImages);
  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostImages,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/housing`);
      }
    },
  });
  const handleNextStep = () => {
    mutate({ postId, postImageList: postImages });
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
