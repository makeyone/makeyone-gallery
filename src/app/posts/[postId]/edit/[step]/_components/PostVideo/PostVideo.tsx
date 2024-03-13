'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import YouTube, { YouTubeEvent } from 'react-youtube';

import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deletePostVideo } from '@/apis/posts/actions/DeletePostVideo';
import { editPostVideo } from '@/apis/posts/actions/EditPostVideo';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { DeletePostVideoInput, DeletePostVideoOutput } from '@/apis/posts/dtos/DeletePostVideo.dto';
import { EditPostVideoInput, EditPostVideoOutput } from '@/apis/posts/dtos/EditPostVideo.dto';
import { EditPostVideoFormInput } from '@/apis/posts/form-inputs/EditPostVideo.input';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/FormFloatingLabelInput';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostVideo.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostVideo({}: Props) {
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
  } = useForm<EditPostVideoFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostVideoFormInput),
    defaultValues: {
      youtubeVideoUrl: post?.postVideo?.youtubeVideoUrl,
      remark: post?.postVideo?.remark || '',
    },
  });

  const { isPending: isEditPostVideoPending, mutate: editPostVideoMutate } = useMutation<
    EditPostVideoOutput,
    AxiosError<EditPostVideoOutput>,
    EditPostVideoInput
  >({
    mutationFn: editPostVideo,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        return push(`/posts/${postId}/edit/setting`);
      }
    },
  });

  const { isPending: isDeletePostVideoPending, mutate: deletePostVideoMutate } = useMutation<
    DeletePostVideoOutput,
    AxiosError<DeletePostVideoOutput>,
    DeletePostVideoInput
  >({
    mutationFn: deletePostVideo,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        return push(`/posts/${postId}/edit/setting`);
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
      <StepCard
        cardTitle="타건영상이 있다면 유튜브 URL을 입력해주세요."
        cardDescription="올리고 싶으신 영상의 URL을 붙여넣기 하시면 됩니다!"
      >
        <FormFloatingLabelInput
          label="[선택입력] 유튜브 영상 URL"
          inputId="youtubeVideoUrl"
          inputType="text"
          maxLength={3000}
          inputRegisterReturn={register('youtubeVideoUrl')}
          currentInputValue={watch().youtubeVideoUrl}
          errorMessage={errors.youtubeVideoUrl?.message}
        />
        {youtubeVideoId !== '' && (
          <>
            <YouTube
              videoId={youtubeVideoId}
              opts={{
                width: '100%',
                height: '600px',
              }}
              onError={(err) => handleYoutubePlayerError(err)}
              onReady={() => handleYoutubePlayerReady()}
            />
            <FormFloatingLabelInput
              label="[선택입력] 특이사항"
              inputId="remark"
              inputType="text"
              maxLength={300}
              inputRegisterReturn={register('remark')}
              currentInputValue={watch().remark}
              errorMessage={errors.remark?.message}
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
