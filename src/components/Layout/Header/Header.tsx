'use client';

import React, { Suspense } from 'react';

import HeaderDesktopAndTabletNav from '@/components/Layout/Header/HeaderDesktopAndTabletNav';
import HeaderLogo from '@/components/Layout/Header/HeaderLogo';
import HeaderMobileNav from '@/components/Layout/Header/HeaderMobileNav';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './Header.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function Header({}: Props) {
  return (
    <header className={cx('header')}>
      <div className={cx('leftBlock')}>
        <HeaderLogo />
      </div>
      <div className={cx('rightBlock')}>
        <Suspense fallback={<React.Fragment />}>
          <HeaderDesktopAndTabletNav />
          <HeaderMobileNav />
        </Suspense>
      </div>
    </header>
  );
}
