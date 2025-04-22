'use client';

import React, { useState } from 'react';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { PostMutation } from '@/api/post/Post.mutation';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

import HeaderChangeLanguageBtn from '@/components/Layout/Header/HeaderChangeLanguageBtn';
import HeaderSignInAndOut from '@/components/Layout/Header/HeaderSignInAndOut';
import PageLoading from '@/components/Loading/PageLoading';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { usePathname, useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';

import styles from './HeaderDesktopAndTabletNav.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function HeaderDesktopAndTabletNav({}: Props) {
  const t = useClientI18n('global');

  const pathname = usePathname();
  const { push } = useRouter();

  const { data: meData, refetch: refetchMe } = useSuspenseQuery({
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
    if (!meData) return push('/users/login');

    createPostMutate();
  };

  const menus = [
    { name: t('header_mypage_link'), link: '/mypage/my-posts' },
    { name: t('header_create_post_btn'), onClick: handleCreatePostBtnClick },
  ];

  const [isChangeLanguageModalOpen, setIsChangeLanguageModalOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className={cx('root', isChangeLanguageModalOpen && 'hasModal')}>
        <nav className={cx('menu')}>
          {menus.map((menu) => (
            <div key={menu.name} className={cx('menuItem', pathname === menu.link && 'active')}>
              {menu.link && (
                <Link className={cx('menuLink')} href={menu.link}>
                  {menu.name}
                </Link>
              )}
              {menu.onClick && (
                <button type="button" className={cx('menuBtn')} onClick={menu.onClick}>
                  {menu.name}
                </button>
              )}
            </div>
          ))}
          <HeaderSignInAndOut meData={meData} refetchMe={() => refetchMe()} />
        </nav>
        <HeaderChangeLanguageBtn isModalOpen={isChangeLanguageModalOpen} setIsModalOpen={setIsChangeLanguageModalOpen} />
      </div>
      {isCreatePostPending && <PageLoading />}
    </React.Fragment>
  );
}
