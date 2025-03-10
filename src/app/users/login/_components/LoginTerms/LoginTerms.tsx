'use client';

import Link from 'next/link';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './LoginTerms.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function LoginTerms({}: Props) {
  return (
    <p className={cx('terms')}>
      메이키원의 <Link href="/terms/service">이용약관</Link>과 <Link href="/terms/privacy">개인정보 처리방침</Link>을 읽었으며
      약관에 동의하는 경우 로그인(회원가입)을 진행해주세요.
    </p>
  );
}
