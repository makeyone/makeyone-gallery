'use client';

import Link from 'next/link';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './Footer.module.css';

const cx = bindClassNames(styles);

export default function Footer() {
  return (
    <footer className={cx('footer')}>
      <p className={cx('copyright')}>&copy; Makeyone(Juniya) all rights reserved.</p>
      <ul className={cx('policyList')}>
        <li className={cx('policyItem')}>
          <Link href="/terms/service">서비스이용약관</Link>
        </li>
        <li className={cx('policyItem')}>
          <Link href="/terms/privacy">개인정보처리방침</Link>
        </li>
      </ul>
    </footer>
  );
}
