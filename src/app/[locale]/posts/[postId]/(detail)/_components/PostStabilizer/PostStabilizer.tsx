'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import snakecase from 'snakecase';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostSectionTitle from '@/app/[locale]/posts/[postId]/(detail)/_components/PostSectionTitle';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './PostStabilizer.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostStabilizer({}: Props) {
  const tPostDetail = useClientI18n('post-detail');
  const tStabilizerEnum = useClientI18n('stabilizer-enum');

  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const postStabilizers = postData?.postStabilizers;

  if (!postStabilizers || postStabilizers.length === 0) {
    return <></>;
  }

  return (
    <div className={cx('root')} id="stabilizer">
      <PostSectionTitle title={tPostDetail('keyboard_stabilizer_list')} />
      <div className={cx('listDiv')}>
        {postStabilizers.map((stabilizer) => (
          <ul className={cx('list')} key={stabilizer.id}>
            <li className={cx('item', 'title')}>{stabilizer.stabilizerName}</li>
            <li className={cx('item')}>
              {tPostDetail('stabilizer_type')} : {tStabilizerEnum(`stabilizer_type_${snakecase(stabilizer.stabilizerType)}`)}
            </li>
            <li className={cx('item')}>
              {tPostDetail('stabilizer_mount')} : {tStabilizerEnum(`stabilizer_mount_${snakecase(stabilizer.stabilizerMount)}`)}
            </li>
            {stabilizer.remark && <li className={cx('item')}>{stabilizer.remark} </li>}
          </ul>
        ))}
      </div>
    </div>
  );
}
