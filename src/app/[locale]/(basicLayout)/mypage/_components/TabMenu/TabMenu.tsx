'use client';

import { toast } from 'react-toastify';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { Link, usePathname } from '@/i18n/routing';

import styles from './TabMenu.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function TabMenu({}: Props) {
  const t = useClientI18n('mypage');

  const pathname = usePathname();

  const handleLikedPostsBtnClick = () => {
    toast.warn(t('liked_posts_is_preparing'), { position: 'top-center' });
  };

  const menus = [
    { name: t('my_posts'), link: '/mypage/my-posts' },
    { name: t('liked_posts'), onClick: handleLikedPostsBtnClick },
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
