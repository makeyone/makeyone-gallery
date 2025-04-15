'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import snakecase from 'snakecase';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostListItem from '@/app/[locale]/posts/[postId]/(detail)/_components/PostListItem';
import PostSectionTitle from '@/app/[locale]/posts/[postId]/(detail)/_components/PostSectionTitle';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './PostPlate.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostPlate({}: Props) {
  const tPostDetail = useClientI18n('post-detail');
  const tPlateEnum = useClientI18n('plate-enum');

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
      <PostSectionTitle title={tPostDetail('keyboard_plate')} />
      <ul className={cx('list')}>
        {postPlate === null && (
          <>
            <PostListItem itemContent={tPostDetail('plateless')} />
          </>
        )}
        {postPlate !== null && (
          <>
            <PostListItem
              itemContent={`${postPlate.plateName} (${tPlateEnum(`plate_texture_${snakecase(postPlate.plateTexture)}`)})`}
            />
            <PostListItem
              itemContent={postPlate.isFlexCutPlate === true ? tPostDetail('flex_cut_plate') : tPostDetail('non_flex_cut_plate')}
            />
            {postPlate.isHalfPlate === true && <PostListItem itemContent={tPostDetail('half_plate')} />}
            {postPlate.remark && <PostListItem itemContent={postPlate.remark} />}
          </>
        )}
      </ul>
    </div>
  );
}
