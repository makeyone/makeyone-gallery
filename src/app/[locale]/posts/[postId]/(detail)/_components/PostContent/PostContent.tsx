'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostSectionTitle from '@/app/[locale]/posts/[postId]/(detail)/_components/PostSectionTitle';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './PostContent.module.css';

const ToastUiViewer = dynamic(() => import('@/components/ToastUiViewer'), { ssr: false });

const cx = bindClassNames(styles);

type Props = {};

export default function PostContent({}: Props) {
  const t = useClientI18n('post-detail');

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
      <PostSectionTitle title={t('post_content')} />
      <ToastUiViewer htmlString={postContent} />
    </div>
  );
}
