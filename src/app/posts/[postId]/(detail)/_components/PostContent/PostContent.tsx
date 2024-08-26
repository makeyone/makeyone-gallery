'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostContent.module.css';

const ToastUiViewer = dynamic(() => import('@/components/ToastUiViewer'), { ssr: false });

const cx = bindClassNames(styles);

type Props = {};

export default function PostContent({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
    select: (selectData) => selectData.data,
  });
  const postContent = postData?.postContent;

  if (!postContent || postContent === '') {
    return <></>;
  }

  return (
    <div className={cx('root')} id="content">
      <PostSectionTitle title="추가 내용" />
      <ToastUiViewer htmlString={postContent} />
    </div>
  );
}
