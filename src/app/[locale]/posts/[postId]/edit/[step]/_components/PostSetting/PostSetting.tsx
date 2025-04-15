'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostStepStatusItem from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PostStepStatusItem';
import PrevOrNextStep from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/StepCard';

import FormLabel from '@/components/Form/FormLabel';
import SliderToggle from '@/components/SliderToggle';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';
import { sweetAlert } from '@/libs/CustomAlert';

import { KeyboardLayoutKey } from '@/utils/keyboards/types/types';

import { useRouter } from '@/i18n/routing';

import styles from './PostSetting.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostSetting({}: Props) {
  const t = useClientI18n('edit-post');

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
          titleText: t('edit_post_success'),
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
      <StepCard cardTitle={t('edit_post_setting_card_title')} cardDescription={t('edit_post_setting_card_description')}>
        <ul className={cx('settingList')}>
          <li className={cx('settingItem')}>
            <FormLabel label={t('edit_post_setting_publish_label')} />
            <SliderToggle isChecked={isPublished} onChange={(isChecked: boolean) => setIsPublished(isChecked)} />
            <p className={cx('settingDescription')}>{t('edit_post_setting_publish_description')}</p>
          </li>
        </ul>
        <div className={cx('postStepStatusBlock')}>
          {postData && (
            <ul className={cx('postStepStatusList')}>
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/title`}
                stepTitle={t('step_title')}
                isRequiredStep
                isWrote={postData.postTitle !== null}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/image`}
                stepTitle={t('step_image')}
                isRequiredStep
                isWrote={postData.postImages.length > 0}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/housing`}
                stepTitle={t('step_housing')}
                isRequiredStep
                isWrote={postData.postHousing !== null}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/pcb`}
                stepTitle={t('step_pcb')}
                isRequiredStep
                isWrote={postData.postPrintedCircuitBoard !== null}
              />
              <PostStepStatusItem stepLink={`/posts/${postId}/edit/plate`} stepTitle={t('step_plate')} isRequiredStep isWrote />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/foam`}
                stepTitle={t('step_foam')}
                isRequiredStep
                isWrote={postData.postFoam !== null}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/switch`}
                stepTitle={t('step_switch')}
                isRequiredStep
                isWrote={postData.postSwitches.length > 0}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/keycap`}
                stepTitle={t('step_keycap')}
                isRequiredStep
                isWrote={postData.postKeycaps.length > 0}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/stabilizer`}
                stepTitle={t('step_stabilizer')}
                isRequiredStep
                isWrote={postData.postStabilizers.length > 0}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/keyboard-definition`}
                stepTitle={t('step_keyboard_definition')}
                isRequiredStep
                isWrote={postData.postKeyboardDefinition !== null}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/switch-on-layout`}
                stepTitle={t('step_switch_on_layout')}
                isRequiredStep={false}
                isWrote={
                  postData.postKeyboardDefinition?.keyboardDefinition.layouts.keys.some(
                    (key: KeyboardLayoutKey) => key?.registeredSwitch !== undefined,
                  ) === true
                }
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/keycap-on-layout`}
                stepTitle={t('step_keycap_on_layout')}
                isRequiredStep={false}
                isWrote={
                  postData.postKeyboardDefinition?.keyboardDefinition.layouts.keys.some(
                    (key: KeyboardLayoutKey) => key?.registeredKeycap !== undefined,
                  ) === true
                }
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/video`}
                stepTitle={t('step_video')}
                isRequiredStep={false}
                isWrote={postData.postVideo !== null}
              />
              <PostStepStatusItem
                stepLink={`/posts/${postId}/edit/content`}
                stepTitle={t('step_content')}
                isRequiredStep={false}
                isWrote={postData.postContent !== null && postData.postContent !== ''}
              />
            </ul>
          )}
        </div>
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
