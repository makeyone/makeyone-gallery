'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostTitle.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostTitle({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  return (
    <h1 className={cx('title')} id="title">
      {postData?.postTitle}
    </h1>
  );
}
