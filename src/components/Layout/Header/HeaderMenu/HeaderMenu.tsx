'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useLocale } from 'next-intl';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AiOutlineGlobal } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

import { PostMutation } from '@/api/post/Post.mutation';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

import { Language } from '@/constants/enum/Language.enum';

import ChangeLanguageModal from '@/components/ChangeLanguageModal';
import HeaderLoginLogout from '@/components/Layout/Header/HeaderLoginLogout';
import PageLoading from '@/components/Loading/PageLoading';

import useClientI18n from '@/hooks/useClientI18n';
import useWindowSize from '@/hooks/useWindowSize';

import { bindClassNames } from '@/libs/BindClassName';

import { usePathname, useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';

import styles from './HeaderMenu.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function HeaderMenu({}: Props) {
  const t = useClientI18n('global');
  const currentLanguageCode = useLocale();

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
    if (userDevice === 'mobile') return toast.warning(t('create_post_mobile_not_supported'));

    if (!meData) return push('/users/login');

    createPostMutate();
  };

  const menus = [
    { name: t('header_mypage_link'), link: '/mypage/my-posts' },
    { name: t('header_create_post_btn'), onClick: handleCreatePostBtnClick },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  useEffect(() => {
    if (userDevice === 'mobile') setIsMenuOpen(false);
    if (userDevice !== 'mobile') setIsMenuOpen(true);
  }, [userDevice]);

  const [isChangeLanguageModalOpen, setIsChangeLanguageModalOpen] = useState<boolean>(false);

  if (isMeDataFetching) {
    return <></>;
  }

  return (
    <React.Fragment>
      <div className={cx('root')}>
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
        <button type="button" className={cx('changeLanguageModalOpenBtn')} onClick={() => setIsChangeLanguageModalOpen(true)}>
          <AiOutlineGlobal /> <span>{Language.findName(currentLanguageCode)}</span>
        </button>
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
      </div>
      {isCreatePostPending && <PageLoading />}
      {isChangeLanguageModalOpen && <ChangeLanguageModal onClose={() => setIsChangeLanguageModalOpen(false)} />}
    </React.Fragment>
  );
}
