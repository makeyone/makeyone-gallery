'use client';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { Link } from '@/i18n/routing';

import styles from './LoginTerms.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function LoginTerms({}: Props) {
  const t = useClientI18n('sign-in');

  return (
    <p className={cx('terms')}>
      {t.rich('sign_in_terms', {
        serviceTermsLink: (chunks) => <Link href="/terms/service">{chunks}</Link>,
        privacyTermsLink: (chunks) => <Link href="/terms/privacy">{chunks}</Link>,
      })}
    </p>
  );
}
