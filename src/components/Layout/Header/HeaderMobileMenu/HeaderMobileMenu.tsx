'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Link from 'next/link';

import { Close } from '@mui/icons-material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import { UserQuery, userQueryKey } from '@/api/user/User.query';

import DisableBodyScroll from '@/components/DisableBodyScroll';
import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';
import HeaderSignInAndOut from '@/components/Layout/Header/HeaderSignInAndOut';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { usePathname } from '@/i18n/routing';

import styles from './HeaderMobileMenu.module.css';

const cx = bindClassNames(styles);

type Props = {
  isShowModal: boolean;
  handleAfterModalClose?: () => void;
};

export default function HeaderMobileMenu({ isShowModal, handleAfterModalClose }: Props) {
  const t = useClientI18n('global');

  const pathname = usePathname();

  const [isShow, setIsShow] = useState<boolean>(isShowModal);
  const handleClose = () => {
    setIsShow(false);
    if (handleAfterModalClose) {
      handleAfterModalClose();
    }
  };

  const { data: meData, refetch: refetchMe } = useSuspenseQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });

  const menus = [
    { name: t('header_mypage_link'), link: '/mypage/my-posts' },
    { name: t('header_create_post_btn'), onClick: () => toast.error(t('create_post_mobile_not_supported')) },
  ];

  return (
    <AnimatePresence>
      {isShow === true && (
        <div className={cx('modal')}>
          <DisableBodyScroll />
          <motion.div
            key="overlay"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              zIndex: 10000,
            }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            key="menu"
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '100%' }}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'stretch',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              zIndex: 10000,
            }}
          >
            <div className={cx('inner')}>
              <button type="button" onClick={handleClose} className={cx('closeBtn')}>
                <Close />
              </button>
              <div className={cx('body')}>
                <div className={cx('profileBlock')}>
                  <div className={cx('profileImgBlock')}>
                    <BlurPlaceholderImage
                      className={cx('profileImg')}
                      src={meData?.profileImg || '/images/users/blank_user.png'}
                      alt={meData?.nickname || t('please_sign_in')}
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                  <div className={cx('profileTextBlock')}>
                    {meData === null && <span className={cx('pleaseSignIn')}>{t('please_sign_in')}</span>}
                    {meData && (
                      <React.Fragment>
                        <span className={cx('profileNickname')}>{meData.nickname}</span>
                        <span className={cx('profileEmail')}>{meData.email}</span>
                      </React.Fragment>
                    )}
                  </div>
                </div>
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
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
