'use client';

import YouTube from 'react-youtube';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostVideo.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostVideo({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const youtubeVideoId = postData?.postVideo?.youtubeVideoId || '';
  const remark = postData?.postVideo?.remark;

  return (
    <>
      {youtubeVideoId !== '' && (
        <div className={cx('root')} id="video">
          <PostSectionTitle title="타건 영상" />
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
          </>
        </div>
      )}
    </>
  );
}
