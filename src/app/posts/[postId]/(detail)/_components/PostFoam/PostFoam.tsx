'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostListItem from '@/app/posts/[postId]/(detail)/_components/PostListItem';
import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostFoam.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostFoam({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const postFoam = postData?.postFoam;

  if (postFoam === null || postFoam === undefined) {
    return <></>;
  }

  const { plateBetweenPCBFoam, bottomFoam, bottomSwitchPEFoam, tapeMod, remark } = postFoam;

  return (
    <div className={cx('root')} id="foam">
      <PostSectionTitle title="흡음재" />
      <ul className={cx('list')}>
        {plateBetweenPCBFoam === false && bottomFoam === false && bottomSwitchPEFoam === false && (
          <PostListItem itemContent="노폼" />
        )}
        {plateBetweenPCBFoam && <PostListItem itemContent="기보강 흠읍재" />}
        {bottomSwitchPEFoam && <PostListItem itemContent="스위치 하부 PE폼 흡음재" />}
        {bottomFoam && <PostListItem itemContent="하부 흡음재" />}
        {tapeMod && <PostListItem itemContent="테이프 모드" />}
        {remark && <PostListItem itemContent={remark} />}
      </ul>
    </div>
  );
}
