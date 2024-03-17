'use client';

import YouTube from 'react-youtube';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostSectionTitle from '@/app/posts/[postId]/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostVideo.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostVideo({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
  });
  const post = data?.post;
  const youtubeVideoId = post?.postVideo?.youtubeVideoId || '';
  const remark = post?.postVideo?.remark;

  return (
    <div className={cx('root')} id="video">
      <PostSectionTitle title="타건 영상" />
      {youtubeVideoId !== '' && (
        <>
          <YouTube
            videoId={youtubeVideoId}
            className={cx('youtube')}
            opts={{
              width: '100%',
              height: '500px',
            }}
          />
          {remark && <p className={cx('remark')}>{remark}</p>}
          {/* <FormFloatingLabelInput
              label="[선택입력] 특이사항"
              inputId="remark"
              inputType="text"
              maxLength={300}
              inputRegisterReturn={register('remark')}
              currentInputValue={watch().remark}
              errorMessage={errors.remark?.message}
            /> */}
        </>
      )}
    </div>
  );
}
