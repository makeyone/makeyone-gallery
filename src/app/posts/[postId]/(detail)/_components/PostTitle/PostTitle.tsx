'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostTitle.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostTitle({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  return (
    <h1 className={cx('title')} id="title">
      {postData?.postTitle}
    </h1>
  );
}
