'use client';

import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

import { createPost } from '@/apis/posts/actions/CreatePost';
import { CreatePostOutput } from '@/apis/posts/dtos/CreatePost.dto';
import { getMe } from '@/apis/users/actions/GetMe';
import { logout } from '@/apis/users/actions/Logout';
import { LogoutOutput } from '@/apis/users/dtos/Logout.dto';
import { usersQueryKeys } from '@/apis/users/users.query-keys';

import DisableBodyScroll from '@/components/DisableBodyScroll';
import PageLoading from '@/components/Loading/PageLoading';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './DrawerMenu.module.css';
import { removeClientCookie } from '@/cookies/client-cookies';

const cx = bindClassNames(styles);

export default function DrawerMenu() {
  const { push } = useRouter();
  const [isOpendMenu, setIsOpendMenu] = useState<boolean>(false);
  const handleOpenBtnClick = () => setIsOpendMenu(true);
  const handleCloseBtnClick = () => setIsOpendMenu(false);
  const handleOutsideClick = () => setIsOpendMenu(false);

  const { data, refetch } = useQuery({
    queryKey: usersQueryKeys.me(),
    queryFn: () => getMe(),
  });

  const { mutate: logoutMutate } = useMutation<LogoutOutput, AxiosError<LogoutOutput>>({
    mutationFn: logout,
    onSuccess: async () => {
      removeClientCookie('refreshToken');
      removeClientCookie('accessToken');
      const logoutRes = await signOut({ redirect: false });
      if (logoutRes) {
        refetch();
        toast.success('로그아웃이 완료되었습니다.');
        push('/');
      }
    },
  });
  const handleLogoutBtnClick = () => {
    logoutMutate();
  };

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
    data?.me ? { name: '로그아웃', onClick: handleLogoutBtnClick } : { name: '로그인', link: '/users/login' },
    { name: '포스트 작성', onClick: handleCreatePostBtnClick },
  ];

  return (
    <div>
      <button type="button" className={cx('menuOpenBtn', isOpendMenu === true && 'opend')} onClick={handleOpenBtnClick}>
        <FiMenu />
      </button>
      <AnimatePresence>
        {isOpendMenu === true && (
          <>
            <DisableBodyScroll />
            <motion.div
              key="overlay"
              className={cx('overlay')}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <OutsideClickHandler onOutsideClick={handleOutsideClick}>
              <motion.div
                key="menu"
                className={cx('menuBlock')}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, x: 390 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 390 }}
              >
                <button type="button" className={cx('menuCloseBtn')} onClick={handleCloseBtnClick}>
                  <IoMdClose />
                </button>
                <ul className={cx('menuList')}>
                  {menus.map((menu) => (
                    <li key={menu.name} className={cx('menuItem')}>
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
                    </li>
                  ))}
                </ul>
              </motion.div>
            </OutsideClickHandler>
          </>
        )}
      </AnimatePresence>
      {isCreatePostPending === true && <PageLoading />}
    </div>
  );
}
