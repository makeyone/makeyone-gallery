'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostStepStatusItem from '@/app/posts/[postId]/edit/[step]/_components/PostStepStatusItem';
import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormLabel from '@/components/Form/FormLabel';
import SliderToggle from '@/components/SliderToggle';

import { bindClassNames } from '@/libs/BindClassName.ts';
import { sweetAlert } from '@/libs/CustomAlert';

import { KeyboardLayoutKey } from '@/utils/keyboards/types/types';

import styles from './PostSetting.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostSetting({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData, refetch } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });
  const { push } = useRouter();

  const [isValidAllStep, setIsValidAllStep] = useState<boolean>(false);
  useEffect(() => {
    if (
      postData &&
      postData.postTitle !== null &&
      postData.postImages.length > 0 &&
      postData.postHousing !== null &&
      postData.postPrintedCircuitBoard !== null &&
      postData.postFoam !== null &&
      postData.postSwitches.length > 0 &&
      postData.postKeycaps.length > 0 &&
      postData.postStabilizers.length > 0 &&
      postData.postKeyboardDefinition !== null
    ) {
      setIsValidAllStep(true);
    }
  }, [postData]);

  const [isPublished, setIsPublished] = useState<boolean>(postData?.isPublished === true);

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostSetting,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        const alert = await sweetAlert.fire({
          icon: 'success',
          titleText: '게시글 작성이 완료되었습니다!',
        });

        if (alert.isConfirmed === true) {
          push(`/posts/${postId}`);
        }
      }
    },
  });

  const handleNextStep = () => {
    mutate({ postId, isPublished });
  };

  return (
    <div className={cx('root')}>
      <StepCard
        cardTitle="마지막 단계입니다!"
        cardDescription="미작성된 부분이 있다면 작성을 해주시고, 게시글 공개 여부를 선택해주세요!"
      >
        <div className={cx('postStepStatusBlock')}>
          {postData && (
            <ul className={cx('postStepStatusList')}>
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/title`}
                stepTitle="게시글 제목"
                isRequiredStep
                isWrote={postData.postTitle !== null}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/image`}
                stepTitle="이미지"
                isRequiredStep
                isWrote={postData.postImages.length > 0}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/housing`}
                stepTitle="하우징"
                isRequiredStep
                isWrote={postData.postHousing !== null}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/pcb`}
                stepTitle="PCB"
                isRequiredStep
                isWrote={postData.postPrintedCircuitBoard !== null}
              />
              <PostStepStatusItem stepLink={`/posts/${postId}/edit/plate`} stepTitle="보강판" isRequiredStep isWrote />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/foam`}
                stepTitle="흡음재"
                isRequiredStep
                isWrote={postData.postFoam !== null}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/switch`}
                stepTitle="스위치"
                isRequiredStep
                isWrote={postData.postSwitches.length > 0}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/keycap`}
                stepTitle="키캡"
                isRequiredStep
                isWrote={postData.postKeycaps.length > 0}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/stabilizer`}
                stepTitle="스테빌라이저"
                isRequiredStep
                isWrote={postData.postStabilizers.length > 0}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/keyboard-definition`}
                stepTitle="키보드 레이아웃"
                isRequiredStep
                isWrote={postData.postKeyboardDefinition !== null}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/switch-on-layout`}
                stepTitle="레이아웃에 스위치 장착"
                isRequiredStep={false}
                isWrote={
                  postData.postKeyboardDefinition?.keyboardDefinition.layouts.keys.some(
                    (key: KeyboardLayoutKey) => key?.registeredSwitch !== undefined,
                  ) === true
                }
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/keycap-on-layout`}
                stepTitle="레이아웃에 키캡 장착"
                isRequiredStep={false}
                isWrote={
                  postData.postKeyboardDefinition?.keyboardDefinition.layouts.keys.some(
                    (key: KeyboardLayoutKey) => key?.registeredKeycap !== undefined,
                  ) === true
                }
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/video`}
                stepTitle="타건 영상"
                isRequiredStep={false}
                isWrote={postData.postVideo !== null}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/content`}
                stepTitle="추가 내용"
                isRequiredStep={false}
                isWrote={postData.postContent !== null && postData.postContent !== ''}
              />
            </ul>
          )}
        </div>
        <ul className={cx('settingList')}>
          <li className={cx('settingItem')}>
            <FormLabel label="내 게시글 공개하기" />
            <SliderToggle isChecked={isPublished} onChange={(isChecked: boolean) => setIsPublished(isChecked)} />
            <p className={cx('settingDescription')}>게시글 공개를 하지 않으면 해당 게시글은 나만 볼 수 있습니다.</p>
          </li>
        </ul>
      </StepCard>
      <PrevOrNextStep
        isFormValid={isValidAllStep}
        onNextStep={() => handleNextStep()}
        isNextStepLoading={isPending}
        buttonText="게시글 작성 완료하기"
      />
    </div>
  );
}
