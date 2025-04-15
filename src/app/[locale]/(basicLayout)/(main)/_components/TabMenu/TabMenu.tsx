'use client';

import { toast } from 'react-toastify';

import { IoIosTrendingUp } from 'react-icons/io';
import { MdAccessTime } from 'react-icons/md';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { Link, usePathname } from '@/i18n/routing';

import styles from './TabMenu.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function TabMenu({}: Props) {
  const t = useClientI18n('main');

  const pathname = usePathname();

  const handleTrendingPostsBtnClick = () => {
    toast.warn(t('trending_posts_is_preparing'), { position: 'top-center' });
  };

  const menus = [
    { icon: <MdAccessTime />, name: t('recently_posts'), link: '/' },
    { icon: <IoIosTrendingUp />, name: t('trending_posts'), onClick: handleTrendingPostsBtnClick },
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
