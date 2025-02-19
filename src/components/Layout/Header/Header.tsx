'use client';

import IsOnMount from '@/components/IsOnMount';
import HeaderLoginLogout from '@/components/Layout/Header/HeaderLoginLogout';
import HeaderLogo from '@/components/Layout/Header/HeaderLogo';
import HeaderMenu from '@/components/Layout/Header/HeaderMenu';

import { bindClassNames } from '@/libs/BindClassName.ts';

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
        <IsOnMount>
          <HeaderMenu />
          <HeaderLoginLogout />
        </IsOnMount>
      </div>
    </header>
  );
}
