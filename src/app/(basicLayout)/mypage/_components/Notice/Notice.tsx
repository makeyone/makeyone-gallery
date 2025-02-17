'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FaChevronRight } from 'react-icons/fa6';
import { GrAnnounce } from 'react-icons/gr';

import { createPost } from '@/apis/posts/actions/CreatePost';
import { CreatePostOutput } from '@/apis/posts/dtos/CreatePost.dto';
import { getMe } from '@/apis/users/actions/GetMe';
import { usersQueryKeys } from '@/apis/users/users.query-keys';

import PageLoading from '@/components/Loading/PageLoading';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './Notice.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function Notice({}: Props) {
  const { push } = useRouter();

  const { data: meData } = useQuery({
    queryKey: usersQueryKeys.me(),
    queryFn: () => getMe(),
    select: (selectData) => selectData.data,
  });

  const [isRouting, setIsRouting] = useState<boolean>(false);
  const { mutate: createPostMutate, isError: isCreatePostError } = useMutation<CreatePostOutput, AxiosError<CreatePostOutput>>({
    mutationFn: createPost,
    onSuccess: async (res) => {
      if (res.data) {
        push(`/posts/${res.data.createdPostId}/edit/title`);
      }
    },
  });
  const handleCreatePostBtnClick = () => {
    if (!meData) {
      return push('/users/login');
    }

    setIsRouting(true);
    return createPostMutate();
  };

  useEffect(() => {
    if (isCreatePostError) {
      setIsRouting(false);
    }
  }, [isCreatePostError]);

  return (
    <div className={cx('root')}>
      <button type="button" className={cx('createPostBtn')} onClick={handleCreatePostBtnClick}>
        <GrAnnounce className={cx('noticeIcon')} color="rgba(67, 125, 255, 0.7)" />
        <div className={cx('noticeContent')}>키보드에 대한 기록을 Makeyone에서 도와줄게요!</div>
        <FaChevronRight />
      </button>
      {isRouting && <PageLoading />}
    </div>
  );
}
