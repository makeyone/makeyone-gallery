'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { createPost } from '@/apis/posts/actions/CreatePost';
import { CreatePostOutput } from '@/apis/posts/dtos/CreatePost.dto';
import { getMe } from '@/apis/users/actions/GetMe';
import { usersQueryKeys } from '@/apis/users/users.query-keys';

import PageLoading from '@/components/Loading/PageLoading';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './HeaderMenu.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function HeaderMenu({}: Props) {
  const pathname = usePathname();
  const { push } = useRouter();

  const { data } = useQuery({
    queryKey: usersQueryKeys.me(),
    queryFn: () => getMe(),
  });

  const { isPending: isCreatePostPending, mutate: createPostMudate } = useMutation<
    CreatePostOutput,
    AxiosError<CreatePostOutput>
  >({
    mutationFn: createPost,
    onSuccess: async (res) => {
      if (res.createdPostId) {
        push(`/posts/${res.createdPostId}/edit/title`);
      }
    },
  });
  const handleCreatePostBtnClick = () => {
    if (data?.me === undefined || data?.me === null) {
      return push('/users/login');
    }

    return createPostMudate();
  };

  const menus = [
    { name: '홈', link: '/' },
    { name: '마이페이지', link: '/mypage' },
    { name: '포스트 작성', onClick: handleCreatePostBtnClick },
  ];

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
