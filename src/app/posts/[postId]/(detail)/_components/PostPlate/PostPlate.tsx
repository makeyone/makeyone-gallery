'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import { KeyboardPlateTexture } from '@/constants/enum/KeyboardPlateTexture.enum';

import PostListItem from '@/app/posts/[postId]/(detail)/_components/PostListItem';
import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostPlate.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostPlate({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });
  const postPlate = postData?.postPlate || null;

  return (
    <div className={cx('root')} id="plate">
      <PostSectionTitle title="보강판" />
      <ul className={cx('list')}>
        {postPlate === null && (
          <>
            <PostListItem itemContent="무보강" />
          </>
        )}
        {postPlate !== null && (
          <>
            <PostListItem itemContent={postPlate.plateName} />
            <PostListItem itemContent={`${KeyboardPlateTexture.findName(postPlate.plateTexture)}`} />
            <PostListItem itemContent={postPlate.isFlexCutPlate === true ? '플렉스 컷 보강판' : '논 플렉스컷 보강판'} />
            {postPlate.isHalfPlate === true && <PostListItem itemContent="하프보강" />}
            {postPlate.remark && <PostListItem itemContent={postPlate.remark} />}
          </>
        )}
      </ul>
    </div>
  );
}
