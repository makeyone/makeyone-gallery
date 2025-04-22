'use client';

import React, { useState } from 'react';

import { GiHamburgerMenu } from 'react-icons/gi';

import HeaderChangeLanguageBtn from '@/components/Layout/Header/HeaderChangeLanguageBtn';
import HeaderMobileMenu from '@/components/Layout/Header/HeaderMobileMenu';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './HeaderMobileNav.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function HeaderMobileNav({}: Props) {
  const [isChangeLanguageModalOpen, setIsChangeLanguageModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className={cx('root', isChangeLanguageModalOpen && 'hasModal')}>
        <HeaderChangeLanguageBtn isModalOpen={isChangeLanguageModalOpen} setIsModalOpen={setIsChangeLanguageModalOpen} />
        <button type="button" className={cx('menuOpenBtn')} onClick={() => setIsMobileMenuOpen(true)}>
          <GiHamburgerMenu />
        </button>
      </div>
      {isMobileMenuOpen && (
        <HeaderMobileMenu isShowModal={isMobileMenuOpen} handleAfterModalClose={() => setIsMobileMenuOpen(false)} />
      )}
    </React.Fragment>
  );
}
