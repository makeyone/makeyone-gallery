'use client';

import React, { Suspense } from 'react';

import HeaderLogo from '@/components/Layout/Header/HeaderLogo';
import HeaderMenu from '@/components/Layout/Header/HeaderMenu';

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
          <HeaderMenu />
        </Suspense>
      </div>
    </header>
  );
}
