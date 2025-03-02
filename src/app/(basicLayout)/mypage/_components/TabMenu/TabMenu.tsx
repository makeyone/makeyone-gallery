'use client';

import { toast } from 'react-toastify';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './TabMenu.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function TabMenu({}: Props) {
  const pathname = usePathname();

  const handleLikedPostsBtnClick = () => {
    toast.warn('준비중입니다.', { position: 'top-center' });
  };

  const menus = [
    { name: '내 포스트', link: '/mypage/my-posts' },
    { name: '좋아요 한 포스트', onClick: handleLikedPostsBtnClick },
  ];

  return (
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
    </nav>
  );
}
