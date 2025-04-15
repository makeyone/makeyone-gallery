'use client';

import React, { useState } from 'react';

import { Close } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';

import DisableBodyScroll from '@/components/DisableBodyScroll';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './BasicModal.module.css';

const cx = bindClassNames(styles);

type Props = {
  isShowModal: boolean;
  children: React.ReactNode;
  handleAfterModalClose?: () => void;
  title?: string;
};

export default function BasicModel({ isShowModal, children, handleAfterModalClose, title }: Props) {
  const [isShow, setIsShow] = useState<boolean>(isShowModal);
  const handleClose = () => {
    setIsShow(false);
    if (handleAfterModalClose) {
      handleAfterModalClose();
    }
  };

  return (
    <AnimatePresence>
      {isShow === true && (
        <div className={cx('modal')}>
          <DisableBodyScroll />
          <motion.div
            key="overlay"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              zIndex: 10000,
            }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            key="menu"
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              zIndex: 10000,
            }}
          >
            <div className={cx('inner')}>
              <button type="button" onClick={handleClose} className={cx('closeBtn')}>
                <Close />
              </button>
              <header className={cx('header')}>{title && <h2 className={cx('title')}>{title}</h2>}</header>
              <div className={cx('body')}>{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
