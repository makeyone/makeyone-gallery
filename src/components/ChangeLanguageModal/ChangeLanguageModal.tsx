'use client';

import React from 'react';

import { useLocale } from 'next-intl';

import { Language, languageCodes } from '@/constants/enum/Language.enum';

import BasicModel from '@/components/Modal/BasicModal';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { usePathname, useRouter } from '@/i18n/routing';

import styles from './ChangeLanguageModal.module.css';

const cx = bindClassNames(styles);

type Props = { onClose: () => void };

export default function ChangeLanguageModal({ onClose }: Props) {
  const t = useClientI18n('global');

  const currentLanguage = useLocale();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChangeLanguage = (languageCode: string) => {
    replace({ pathname }, { locale: languageCode });
  };

  return (
    <BasicModel isShowModal handleAfterModalClose={onClose} title={t('change_language_modal_title')}>
      <div className={cx('root')}>
        <p className={cx('description')}>{t('change_language_modal_description')}</p>
        <ul className={cx('list')}>
          {languageCodes.map((code) => (
            <li key={code} className={cx('item', currentLanguage === code && 'active')}>
              <button type="button" className={cx('btn')} onClick={() => handleChangeLanguage(code)}>
                <b>{Language.findName(code)}</b>
                <span>{code}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </BasicModel>
  );
}
