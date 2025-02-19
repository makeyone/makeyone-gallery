'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { FaChevronRight } from 'react-icons/fa6';
import { GrAnnounce } from 'react-icons/gr';

import { PostMutation } from '@/api/post/Post.mutation';

import PageLoading from '@/components/Loading/PageLoading';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './Notice.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function Notice({}: Props) {
  const { push } = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.createPost,
    onSuccess: async (res) => {
      push(`/posts/${res.data.createdPostId}/edit/title`);
    },
  });

  const handleCreatePostBtnClick = () => {
    return mutate();
  };

  return (
    <div className={cx('root')}>
      <button type="button" className={cx('createPostBtn')} onClick={handleCreatePostBtnClick}>
        <GrAnnounce className={cx('noticeIcon')} color="rgba(67, 125, 255, 0.7)" />
        <div className={cx('noticeContent')}>내 키보드에 대한 기록을 Makeyone에서 섬세히 기록해봐요.</div>
        <FaChevronRight />
      </button>
      {isPending && <PageLoading />}
    </div>
  );
}
