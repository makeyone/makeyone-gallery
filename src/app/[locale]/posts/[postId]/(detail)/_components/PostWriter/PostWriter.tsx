'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './PostWriter.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostWriter({}: Props) {
  const t = useClientI18n('post-detail');

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
      <span className={cx('postedDate')}>{t('posted_date', { timeAgo: postData.createdDateTimeAgo })}</span>
      <div className={cx('writerBlock')}>
        <BlurPlaceholderImage
          className={cx('profileImg')}
          src={postData.postedUser?.profileImg || '/images/users/blank_user.png'}
          alt={postData.postedUser?.nickname || t('withdrawn_user')}
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className={cx('textBlock')}>
          <h4 className={cx('postedBy')}>
            {postData.postedUser && (
              <React.Fragment>
                {t.rich('posted_user', { nickname: postData.postedUser.nickname, b: (text) => <b>{text}</b> })}
              </React.Fragment>
            )}
            {postData.postedUser === null && <React.Fragment>{t('withdrawn_user')}</React.Fragment>}
          </h4>
        </div>
      </div>
    </div>
  );
}
