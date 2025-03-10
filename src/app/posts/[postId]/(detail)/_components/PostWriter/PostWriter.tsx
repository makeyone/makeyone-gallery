'use client';

import React from 'react';

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
          src={postData.postedUser?.profileImg || '/images/users/blank_user.png'}
          alt={postData.postedUser?.nickname || '탈퇴한 회원'}
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className={cx('textBlock')}>
          <h4 className={cx('postedBy')}>
            {postData.postedUser && (
              <React.Fragment>
                Posted by <b>{postData.postedUser.nickname}</b>
              </React.Fragment>
            )}
            {postData.postedUser === null && <React.Fragment>탈퇴한 회원</React.Fragment>}
          </h4>
        </div>
      </div>
    </div>
  );
}
