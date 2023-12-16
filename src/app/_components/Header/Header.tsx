'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './Header.module.css';

const cx = bindClassNames(styles);

export default function Header() {
  const pathname = usePathname();
  const menus = [
    {
      name: 'ALL PHOTOS',
      link: '/',
    },
    {
      name: 'KEYBOARDS',
      link: '/keyboards',
    },
    {
      name: 'KEYCAPS',
      link: '/keycaps',
    },
    {
      name: 'ETC.',
      link: '/etc',
    },
  ];

  return (
    <header className={cx('header')}>
      <Image className={cx('logo')} src="/images/logo.png" alt="메이키원 로고" width={116} height={101} />
      <ul className={cx('menu')}>
        {menus.map((menu) => (
          <li key={menu.name} className={cx('menuItem')}>
            <Link className={cx('menuLink', pathname === menu.link && 'active')} href={menu.link}>
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
