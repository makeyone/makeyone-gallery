'use client';

import YouTube from 'react-youtube';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostSectionTitle from '@/app/[locale]/posts/[postId]/(detail)/_components/PostSectionTitle';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './PostVideo.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostVideo({}: Props) {
  const t = useClientI18n('post-detail');

  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const youtubeVideoId = postData?.postVideo?.youtubeVideoId || '';
  const remark = postData?.postVideo?.remark;

  return (
    <>
      {youtubeVideoId !== '' && (
        <div className={cx('root')} id="video">
          <PostSectionTitle title={t('keyboard_video')} />
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
