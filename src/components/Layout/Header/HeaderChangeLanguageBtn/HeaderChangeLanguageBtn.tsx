'use client';

import React, { Dispatch, SetStateAction } from 'react';

import { useLocale } from 'next-intl';

import { AiOutlineGlobal } from 'react-icons/ai';

import { Language } from '@/constants/enum/Language.enum';

import ChangeLanguageModal from '@/components/ChangeLanguageModal';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './HeaderChangeLanguageBtn.module.css';

const cx = bindClassNames(styles);

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function HeaderChangeLanguageBtn({ isModalOpen, setIsModalOpen }: Props) {
  const currentLanguageCode = useLocale();

  return (
    <React.Fragment>
      <button type="button" className={cx('changeLanguageModalOpenBtn')} onClick={() => setIsModalOpen(true)}>
        <AiOutlineGlobal /> <span>{Language.findName(currentLanguageCode)}</span>
      </button>
      {isModalOpen && <ChangeLanguageModal onClose={() => setIsModalOpen(false)} />}
    </React.Fragment>
  );
}
