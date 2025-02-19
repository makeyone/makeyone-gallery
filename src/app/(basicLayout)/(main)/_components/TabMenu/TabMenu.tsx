'use client';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IoIosTrendingUp } from 'react-icons/io';
import { MdAccessTime } from 'react-icons/md';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './TabMenu.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function TabMenu({}: Props) {
  const pathname = usePathname();

  const handleTrendingPostsBtnClick = () => {
    toast.warn('준비중입니다.', { position: 'top-center' });
  };

  const menus = [
    { icon: <MdAccessTime />, name: '최신 포스트', link: '/' },
    { icon: <IoIosTrendingUp />, name: '인기 포스트', onClick: handleTrendingPostsBtnClick },
  ];

  return (
    <nav className={cx('menu')}>
      {menus.map((menu) => (
        <div key={menu.name} className={cx('menuItem', pathname === menu.link && 'active')}>
          {menu.link && (
            <Link className={cx('menuLink')} href={menu.link}>
              {menu.icon} {menu.name}
            </Link>
          )}
          {menu.onClick && (
            <button type="button" className={cx('menuLink')} onClick={menu.onClick}>
              {menu.icon} {menu.name}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
}
