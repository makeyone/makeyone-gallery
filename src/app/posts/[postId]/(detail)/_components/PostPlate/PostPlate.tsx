'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { KeyboardPlateTexture } from '@/apis/posts/enums/KeyboardPlateTexture.enum';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostListItem from '@/app/posts/[postId]/(detail)/_components/PostListItem';
import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostPlate.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostPlate({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
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
