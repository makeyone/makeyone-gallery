'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';

import { PostMutation } from '@/api/post/Post.mutation';
import { CreatePostViewModel } from '@/api/post/view-model/CreatePostViewModel';
import { ApiResponse } from '@/api/support/response/ApiResponse';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

import PageLoading from '@/components/Loading/PageLoading';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './HeaderMenu.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function HeaderMenu({}: Props) {
  const pathname = usePathname();
  const { push } = useRouter();

  const { isFetching: isMeDataFetching, data: meData } = useQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });

  const { isPending: isCreatePostPending, mutate: createPostMutate } = useMutation<
    ViewModelMapper<CreatePostViewModel>,
    ApiResponse
  >({
    mutationFn: PostMutation.createPost,
    onSuccess: async (res) => {
      push(`/posts/${res.data.createdPostId}/edit/title`);
    },
  });

  const handleCreatePostBtnClick = () => {
    if (!meData) {
      return push('/users/login');
    }

    createPostMutate();
  };

  const menus = [
    { name: '홈', link: '/' },
    { name: '마이페이지', link: '/mypage' },
    { name: '포스트 작성', onClick: handleCreatePostBtnClick },
  ];

  if (isMeDataFetching) {
    return <></>;
  }

  return (
    <>
      <nav className={cx('menu')}>
        {menus.map((menu) => (
          <div key={menu.name} className={cx('menuItem', pathname === menu.link && 'active')}>
            {menu.link && (
              <Link className={cx('menuLink')} href={menu.link}>
                {menu.name}
              </Link>
            )}
            {menu.onClick && (
              <button type="button" className={cx('menuLink')} onClick={menu.onClick}>
                {menu.name}
              </button>
            )}
          </div>
        ))}
      </nav>
      {isCreatePostPending && <PageLoading />}
    </>
  );
}
