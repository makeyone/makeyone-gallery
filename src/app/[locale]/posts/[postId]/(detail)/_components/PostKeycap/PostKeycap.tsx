'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostSectionTitle from '@/app/[locale]/posts/[postId]/(detail)/_components/PostSectionTitle';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './PostKeycap.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostKeycap({}: Props) {
  const t = useClientI18n('post-detail');

  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const postKeycaps = postData?.postKeycaps;

  if (!postKeycaps || postKeycaps.length === 0) {
    return <></>;
  }

  return (
    <div className={cx('root')} id="keycap">
      <PostSectionTitle title={t('keyboard_keycap_list')} />
      <div className={cx('listDiv')}>
        {postKeycaps.map((keycap) => (
          <ul className={cx('list')} key={keycap.id}>
            <li className={cx('item', 'title')}>{keycap.keycapName}</li>
            <li className={cx('item')}>
              {t('keycap_profile')} : {keycap.keycapProfile}
            </li>
            <li className={cx('item')}>
              {t('keycap_texture')} : {keycap.keycapTexture}
            </li>
            {keycap.manufacturer && (
              <li className={cx('item')}>
                {t('keycap_manufacturer')} : {keycap.manufacturer}
              </li>
            )}
            {keycap.remark && <li className={cx('item')}>{keycap.remark} </li>}
          </ul>
        ))}
      </div>
    </div>
  );
}
