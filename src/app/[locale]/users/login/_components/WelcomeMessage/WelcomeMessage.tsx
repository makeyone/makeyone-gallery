'use client';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './WelcomeMessage.module.css';

const cx = bindClassNames(styles);

export default function WelcomeMessage() {
  const t = useClientI18n('sign-in');

  return (
    <div className={cx('block')}>
      <h2 className={cx('title')}>{t('welcome_title')}</h2>
      <h3 className={cx('subTitle')}>{t('welcome_sub_title')}</h3>
      <h3 className={cx('description')}>{t('welcome_description')}</h3>
    </div>
  );
}
