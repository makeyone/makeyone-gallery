'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import YouTube, { YouTubeEvent } from 'react-youtube';

import { useParams } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IsOptional, IsString, MaxLength, Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PrevOrNextStep from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { useRouter } from '@/i18n/routing';

import styles from './PostVideo.module.css';

const cx = bindClassNames(styles);

@ValidatorConstraint({ name: 'validateYoutubeVideoUrl', async: false })
export class YoutubeVideoUrlValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    let url = value;
    if (url.includes('youtube.com/shorts')) {
      url = url.replace('/shorts/', '/watch?v=');
    }

    const youtubeVideoUrlRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const youtubeVideoUrlMatch = url.match(youtubeVideoUrlRegExp);

    const valid = url === '' || (youtubeVideoUrlMatch !== null && youtubeVideoUrlMatch[7].length === 11);
    return valid;
  }

  defaultMessage() {
    return 'edit_post_input_is_not_youtube_video_url';
  }
}

class EditPostVideoFormInput {
  @IsOptional()
  @IsString()
  @MaxLength(3000, { message: 'edit_post_input_youtube_video_url_max_length_is_3000' })
  @Validate(YoutubeVideoUrlValidator)
  youtubeVideoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: 'edit_post_input_video_remark_max_length_is_300' })
  remark?: string;
}

type Props = {};

export default function PostVideo({}: Props) {
  const t = useClientI18n('edit-post');

  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData, refetch } = useQuery({
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
  } = useForm<EditPostVideoFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostVideoFormInput),
    defaultValues: {
      youtubeVideoUrl: postData?.postVideo?.youtubeVideoUrl,
      remark: postData?.postVideo?.remark || '',
    },
  });

  const { isPending: isEditPostVideoPending, mutate: editPostVideoMutate } = useMutation({
    mutationFn: PostMutation.editPostVideo,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/content`);
      }
    },
  });

  const { isPending: isDeletePostVideoPending, mutate: deletePostVideoMutate } = useMutation({
    mutationFn: PostMutation.deletePostVideo,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/content`);
      }
    },
  });

  const onSubmitEditVideo = () => {
    const { youtubeVideoUrl, remark } = getValues();

    if (youtubeVideoUrl) {
      editPostVideoMutate({
        postId,
        youtubeVideoUrl,
        ...(remark && { remark }),
      });
    }
  };

  const handleDeleteVideo = () => {
    deletePostVideoMutate({ postId });
  };

  const handleNextStep = () => {
    const { youtubeVideoUrl } = getValues();

    if (youtubeVideoUrl) {
      return handleSubmitAndNextStep(onSubmitEditVideo)();
    }

    return handleDeleteVideo();
  };

  const [youtubeVideoId, setYoutubeVideoId] = useState<string>('');
  useEffect(() => {
    let url = watch().youtubeVideoUrl || '';
    if (url.includes('youtube.com/shorts')) {
      url = url.replace('/shorts/', '/watch?v=');
    }

    const youtubeVideoUrlRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const youtubeVideoUrlMatch = url.match(youtubeVideoUrlRegExp);
    setYoutubeVideoId(youtubeVideoUrlMatch && youtubeVideoUrlMatch[7].length === 11 ? youtubeVideoUrlMatch[7] : '');
  }, [watch().youtubeVideoUrl]);

  const [youtubePlayerError, setYoutubePlayerError] = useState<YouTubeEvent<number> | null>(null);
  const handleYoutubePlayerError = (err: YouTubeEvent<number>) => {
    console.error('>> Entered Youtube Url : ', watch().youtubeVideoUrl);
    console.error('>> Youtube Player Error : ', err);
    setYoutubePlayerError(err);
  };
  const handleYoutubePlayerReady = () => {
    setYoutubePlayerError(null);
  };

  return (
    <div className={cx('root')}>
      <StepCard cardTitle={t('edit_post_video_card_title')} cardDescription={t('edit_post_video_card_description')}>
        <FormFloatingLabelInput
          label={t('edit_post_input_youtube_video_url_label')}
          inputId="youtubeVideoUrl"
          inputType="text"
          maxLength={3000}
          inputRegisterReturn={register('youtubeVideoUrl')}
          currentInputValue={watch().youtubeVideoUrl}
          errorMessage={errors.youtubeVideoUrl?.message && t(errors.youtubeVideoUrl.message)}
        />
        {youtubeVideoId !== '' && (
          <>
            <YouTube
              videoId={youtubeVideoId}
              opts={{
                width: '100%',
                height: '600px',
              }}
              onError={(err: YouTubeEvent<number>) => handleYoutubePlayerError(err)}
              onReady={() => handleYoutubePlayerReady()}
            />
            <FormFloatingLabelInput
              label={t('edit_post_input_video_remark_label')}
              inputId="remark"
              inputType="text"
              maxLength={300}
              inputRegisterReturn={register('remark')}
              currentInputValue={watch().remark}
              errorMessage={errors.remark?.message && t(errors.remark.message)}
            />
          </>
        )}
      </StepCard>
      <PrevOrNextStep
        isFormValid={isValid && youtubePlayerError === null}
        onNextStep={() => handleNextStep()}
        isNextStepLoading={isEditPostVideoPending || isDeletePostVideoPending}
      />
    </div>
  );
}
