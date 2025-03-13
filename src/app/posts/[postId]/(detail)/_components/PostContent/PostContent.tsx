'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostContent.module.css';

const ToastUiViewer = dynamic(() => import('@/components/ToastUiViewer'), { ssr: false });

const cx = bindClassNames(styles);

type Props = {};

export default function PostContent({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });
  const postContent = postData?.postContent;

  if (!postContent || !postContent.replace(/\s+/g, '')) {
    return <></>;
  }

  return (
    <div className={cx('root')} id="content">
      <PostSectionTitle title="추가 내용" />
      <ToastUiViewer htmlString={postContent} />
    </div>
  );
}
