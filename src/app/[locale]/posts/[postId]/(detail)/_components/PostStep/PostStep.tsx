'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostStepItem from '@/app/[locale]/posts/[postId]/(detail)/_components/PostStepItem';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './PostStep.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostStep({}: Props) {
  const t = useClientI18n('post-detail');

  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  if (postData === undefined) {
    return <></>;
  }

  return (
    <div className={cx('root')}>
      <h3 className={cx('title')}>{t('post_section_order')}</h3>
      <ul className={cx('list')}>
        <PostStepItem connectElementId="title" stepTitle={t('post_title')} />
        {postData.postVideo !== null && <PostStepItem connectElementId="video" stepTitle={t('keyboard_video')} />}
        <PostStepItem connectElementId="layout" stepTitle={t('keyboard_layout')} />
        <PostStepItem connectElementId="pcb" stepTitle="PCB" />
        <PostStepItem connectElementId="plate" stepTitle={t('keyboard_plate')} />
        <PostStepItem connectElementId="foam" stepTitle={t('keyboard_foam')} />
        <PostStepItem connectElementId="switch" stepTitle={t('keyboard_switch_list')} />
        <PostStepItem connectElementId="keycap" stepTitle={t('keyboard_keycap_list')} />
        <PostStepItem connectElementId="stabilizer" stepTitle={t('keyboard_stabilizer_list')} />
        {postData.postContent && postData.postContent.replace(/\s+/g, '') !== '' && (
          <PostStepItem connectElementId="content" stepTitle={t('post_content')} />
        )}
      </ul>
    </div>
  );
}
