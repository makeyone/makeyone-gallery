'use client';

import Image from 'next/image';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './HeaderLogo.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function HeaderLogo({}: Props) {
  return <Image className={cx('logoSymbol')} src="/images/logo_symbol.png" alt="메이키원 로고 심볼" width={60} height={60} />;
}
