'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import { bindClassNames } from '@/libs/BindClassName.ts';

import dateTimeAgo from '@/utils/date-time-ago';

import styles from './PostWriter.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostWriter({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  if (postData === undefined) {
    return <></>;
  }

  return (
    <div className={cx('root')}>
      <span className={cx('postedDate')}>{dateTimeAgo(postData.createdAt)} 작성</span>
      <div className={cx('writerBlock')}>
        <BlurPlaceholderImage
          className={cx('profileImg')}
          src={postData.postedUser.profileImg as string}
          alt={postData.postedUser.nickname}
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className={cx('textBlock')}>
          <h4 className={cx('postedBy')}>
            Posted by<b>{postData.postedUser.nickname}</b>
          </h4>
        </div>
      </div>
    </div>
  );
}
