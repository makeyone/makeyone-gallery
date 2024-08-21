'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import { bindClassNames } from '@/libs/bind-class-name';

import dateTimeAgo from '@/utils/date-time-ago';

import styles from './PostWriter.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostWriter({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
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
