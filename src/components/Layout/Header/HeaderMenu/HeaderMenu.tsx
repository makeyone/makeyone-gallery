'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

import { PostMutation } from '@/api/post/Post.mutation';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

import HeaderLoginLogout from '@/components/Layout/Header/HeaderLoginLogout';
import PageLoading from '@/components/Loading/PageLoading';

import useWindowSize from '@/hooks/useWindowSize';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './HeaderMenu.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function HeaderMenu({}: Props) {
  const pathname = usePathname();
  const { userDevice } = useWindowSize();
  const { push } = useRouter();

  const {
    isFetching: isMeDataFetching,
    data: meData,
    refetch: refetchMe,
  } = useQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });

  const { isPending: isCreatePostPending, mutate: createPostMutate } = useMutation({
    mutationFn: PostMutation.createPost,
    onSuccess: async (res) => {
      push(`/posts/${res.data.createdPostId}/edit/title`);
    },
  });

  const handleCreatePostBtnClick = () => {
    if (userDevice === 'mobile') return toast.warning('게시글 작성은 모바일 환경에서 지원하지 않습니다.');

    if (!meData) return push('/users/login');

    createPostMutate();
  };

  const menus = [
    { name: '홈', link: '/' },
    { name: '마이페이지', link: '/mypage/my-posts' },
    { name: '포스트 작성', onClick: handleCreatePostBtnClick },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  useEffect(() => {
    if (userDevice === 'mobile') setIsMenuOpen(false);
    if (userDevice !== 'mobile') setIsMenuOpen(true);
  }, [userDevice]);

  if (isMeDataFetching) {
    return <></>;
  }

  console.log('>> isMenuOpen : ', isMenuOpen);

  return (
    <div className={cx('root')}>
      {userDevice === 'mobile' && isMenuOpen === true && (
        <button type="button" className={cx('mobileMenuOpenAndCloseBtn')} onClick={() => setIsMenuOpen(false)}>
          <MdClose />
        </button>
      )}
      {userDevice === 'mobile' && isMenuOpen === false && (
        <button type="button" className={cx('mobileMenuOpenAndCloseBtn')} onClick={() => setIsMenuOpen(true)}>
          <GiHamburgerMenu />
        </button>
      )}
      {isMenuOpen && (
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
          <HeaderLoginLogout meData={meData} refetchMe={() => refetchMe()} />
        </nav>
      )}
      {isCreatePostPending && <PageLoading />}
    </div>
  );
}
