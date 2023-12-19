'use client';

import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

import DisableBodyScroll from '@/components/DisableBodyScroll';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './DrawerMenu.module.css';

const cx = bindClassNames(styles);

export default function DrawerMenu() {
  const menus = [
    {
      name: '로그인',
      link: '/users/login',
    },
    {
      name: '포스트 작성',
      link: '/posts/create',
    },
  ];

  const [isOpendMenu, setIsOpendMenu] = useState<boolean>(false);
  const handleOpenBtnClick = () => setIsOpendMenu(true);
  const handleCloseBtnClick = () => setIsOpendMenu(false);
  const handleOutsideClick = () => setIsOpendMenu(false);

  return (
    <div>
      <button type="button" className={cx('menuOpenBtn', isOpendMenu === true && 'opend')} onClick={handleOpenBtnClick}>
        <FiMenu />
      </button>
      <AnimatePresence>
        {isOpendMenu === true && (
          <>
            <DisableBodyScroll />
            <motion.div
              key="overlay"
              className={cx('overlay')}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <OutsideClickHandler onOutsideClick={handleOutsideClick}>
              <motion.div
                key="menu"
                className={cx('menuBlock')}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, x: 390 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 390 }}
              >
                <button type="button" className={cx('menuCloseBtn')} onClick={handleCloseBtnClick}>
                  <IoMdClose />
                </button>
                <ul className={cx('menuList')}>
                  {menus.map((menu) => (
                    <li key={menu.name} className={cx('menuItem')}>
                      <Link className={cx('menuLink')} href={menu.link}>
                        {menu.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </OutsideClickHandler>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
