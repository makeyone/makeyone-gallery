'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PrevOrNextStep from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/StepCard';

import DragAndDropImgUpload from '@/components/DragAndDropImg/DragAndDropImgUpload';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { useRouter } from '@/i18n/routing';

import styles from './PostImages.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostImages({}: Props) {
  const t = useClientI18n('edit-post');

  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useSuspenseQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const { push } = useRouter();

  const defaultPostImages = postData!.postImages.map((postImage) => postImage.imageUrl) || [];
  const [postImages, setPostImages] = useState<string[]>(defaultPostImages);
  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostImages,
    onSuccess: () => push(`/posts/${postId}/edit/housing`),
  });
  const handleNextStep = () => {
    mutate({ postId, postImageList: postImages });
  };

  return (
    <div className={cx('root')}>
      <StepCard cardTitle={t('edit_post_image_card_title')} cardDescription={t('edit_post_image_card_description')}>
        <DragAndDropImgUpload defaultImages={postImages} setDefaultImages={setPostImages} />
      </StepCard>
      <PrevOrNextStep isFormValid={postImages.length > 0} onNextStep={() => handleNextStep()} isNextStepLoading={isPending} />
    </div>
  );
}
