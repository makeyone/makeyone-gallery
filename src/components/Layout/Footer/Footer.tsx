'use client';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { Link } from '@/i18n/routing';

import styles from './Footer.module.css';

const cx = bindClassNames(styles);

export default function Footer() {
  const t = useClientI18n('global');

  return (
    <footer className={cx('footer')}>
      <p className={cx('copyright')}>&copy; Makeyone all rights reserved.</p>
      <ul className={cx('policyList')}>
        <li className={cx('policyItem')}>
          <Link href="/terms/service">{t('footer_terms_service_link')}</Link>
        </li>
        <li className={cx('policyItem')}>
          <Link href="/terms/privacy">{t('footer_terms_privacy_link')}</Link>
        </li>
      </ul>
    </footer>
  );
}
