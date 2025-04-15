'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostListItem from '@/app/[locale]/posts/[postId]/(detail)/_components/PostListItem';
import PostSectionTitle from '@/app/[locale]/posts/[postId]/(detail)/_components/PostSectionTitle';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './PostFoam.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostFoam({}: Props) {
  const t = useClientI18n('post-detail');

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

  const { plateFoam, pcbFoam, caseFoam, tapeMod, remark } = postFoam;

  return (
    <div className={cx('root')} id="foam">
      <PostSectionTitle title={t('keyboard_foam')} />
      <ul className={cx('list')}>
        {plateFoam === false && pcbFoam === false && caseFoam === false && <PostListItem itemContent={t('no_foam')} />}
        {plateFoam && <PostListItem itemContent={t('plate_foam')} />}
        {pcbFoam && <PostListItem itemContent={t('pcb_foam')} />}
        {caseFoam && <PostListItem itemContent={t('case_foam')} />}
        {tapeMod && <PostListItem itemContent={t('tape_mod')} />}
        {remark && <PostListItem itemContent={remark} />}
      </ul>
    </div>
  );
}
